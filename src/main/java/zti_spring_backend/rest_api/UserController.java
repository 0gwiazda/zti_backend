package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.auth.AuthService;
import zti_spring_backend.auth.AuthenticationResponse;
import zti_spring_backend.auth.PasswordChangeRequest;
import zti_spring_backend.auth.PasswordResetResponse;
import zti_spring_backend.exception.AdminException;
import zti_spring_backend.exception.ItemNotFoundException;
import zti_spring_backend.exception.UserNotFoundException;
import zti_spring_backend.model.User;
import zti_spring_backend.repo.*;

import java.util.List;
import java.util.Random;

@RestController
@Tag(name="User Controller", description = "Controller for user operations")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    RecommendRepository recommendRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AuthService authService;


    @GetMapping("/user")
    @Operation(summary = "Get all users", description = "Gets all users. If current user isn't admin, throws AdminException", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<User>> allUsers(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));

        if(!user.getRole().equals("ADMIN"))
            throw new AdminException("You are not admin");

        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/user/me")
    @Operation(summary = "Get current user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<User> findCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException(username)));
    }

    @GetMapping("/auth/user/{id}")
    @Operation(summary = "Get a user with matching id")
    public ResponseEntity<User> getUser(@PathVariable long id){
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id)));
    }

    @PostMapping("/user/change-password")
    @Operation(summary = "Change password of current user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<AuthenticationResponse> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(authService.changePassword(username, passwordChangeRequest.getPassword(), passwordChangeRequest.getNewPassword()));
    }

    @PutMapping("/user/reset-password/{id}")
    @Operation(summary = "Reset password for user", description="Resets password for user with matching id. If current user isn't admin throws AdminException", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<PasswordResetResponse> resetPassword(@PathVariable long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(id));

        if(!user.getRole().equals("ADMIN"))
            throw new AdminException("You are not admin");



        return ResponseEntity.ok(authService.resetPassword(id));
    }

    @PutMapping("/user/me")
    @Operation(summary = "Edit current user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<User> editUser(@RequestBody User user)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(userRepository.findByEmail(username).map(oldUser -> {
            oldUser.setFname(user.getFname());
            oldUser.setLname(user.getLname());
            oldUser.setAddress(user.getAddress());
            oldUser.setCity(user.getCity());
            oldUser.setCode(user.getCode());
            return userRepository.save(oldUser);
        }).orElseThrow(() -> new UserNotFoundException(username)));
    }

    @Transactional
    @DeleteMapping("/user")
    @Operation(summary = "Delete user and all connected records with matching email", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteUser(@RequestParam String email)
    {
        var user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));

        commentRepository.deleteAllBySellerid(user.getId());
        commentRepository.deleteAllByUserid(user.getId());

        recommendRepository.deleteAllBySellerid(user.getId());
        recommendRepository.deleteAllByUserid(user.getId());

        offerRepository.findBySellerid(user.getId()).forEach(offer -> {
            var item = itemRepository.findById(offer.getItemid()).orElseThrow(() -> new ItemNotFoundException(offer.getItemid()));
            offerRepository.deleteById(offer.getId());
            itemRepository.deleteById(item.getId());
        });

        orderRepository.deleteAllByBuyerid(user.getId());

        userRepository.deleteByEmail(user.getEmail());

        return ResponseEntity.ok("User deleted successfully");
    }
}
