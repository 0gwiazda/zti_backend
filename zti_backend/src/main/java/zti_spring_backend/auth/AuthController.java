package zti_spring_backend.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller used for user authentication
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth Controller", description = "Controller for authentication operations")
public class AuthController {

    /**
     * Authentication service described here: {@link zti_spring_backend.auth.AuthService}
     */
    private final AuthService authService;

    /**
     * Endpoint for registering new users
     * @param req RegisterRequest containing user data
     * @return ResponseEntity containing AuthenticationResponse with JWT token
     */
    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Registers a new user. Returns a JWT token")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest req)
    {
        return ResponseEntity.ok(authService.register(req));
    }

    /**
     * Endpoint for authenticating existing users
     * @param req AuthenticationRequest containing user email and password
     * @return ResponseEntity containing AuthenticationResponse with JWT token
     */
    @PostMapping("/authenticate")
    @Operation(summary = "Authenticate a user", description = "Authenticates existing user. Returns a JWT token")
    public ResponseEntity<AuthenticationResponse> auth(@RequestBody AuthenticationRequest req)
    {
        return ResponseEntity.ok(authService.auth(req));
    }
}
