package zti_spring_backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import zti_spring_backend.config.JwtService;
import zti_spring_backend.exception.AuthLoginException;
import zti_spring_backend.exception.AuthRegisterException;
import zti_spring_backend.exception.UserNotFoundException;
import zti_spring_backend.model.User;
import zti_spring_backend.repo.UserRepository;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register (RegisterRequest registerRequest){

        var checkUser = userRepository.findByEmail(registerRequest.getEmail());

        if(checkUser.isPresent())
            throw new AuthRegisterException(registerRequest.getEmail());

        var user = User.builder()
                .fname(registerRequest.getFname())
                .lname(registerRequest.getLname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .address(registerRequest.getAddress())
                .city(registerRequest.getCity())
                .code(registerRequest.getCode())
                .build();

        userRepository.save(user);
        var claims = new HashMap<String, Object>();
        claims.put("user_id", user.getId());
        var token = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder().token(token).build();
    }

    public AuthenticationResponse auth (AuthenticationRequest authRequest){

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );
        }
        catch(AuthenticationException e){
            throw new AuthLoginException(authRequest.getEmail());
        }

        var user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new UserNotFoundException(authRequest.getEmail()));

        var claims = new HashMap<String, Object>();
        claims.put("user_id", user.getId());
        var token = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder().token(token).build();
    }

    public AuthenticationResponse changePassword (String email, String currentPassword, String newPassword){

        var user = userRepository.findByEmail(email).map(oldUser -> {
            oldUser.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(oldUser);
        }).orElseThrow(() -> new UserNotFoundException(email));

        var claims = new HashMap<String, Object>();
        claims.put("user_id", user.getId());
        var token = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder().token(token).build();
    }
}
