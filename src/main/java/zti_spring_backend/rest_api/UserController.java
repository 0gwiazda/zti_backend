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

/**
 * Controller for user operations.
 */
@RestController
@Tag(name="User Controller", description = "Controller for user operations")
public class UserController {

    /**
     * User repository described here: {@link zti_spring_backend.repo.UserRepository}
     */
    @Autowired
    UserRepository userRepository;

    /**
     * Offer repository described here: {@link zti_spring_backend.repo.OfferRepository}
     */
    @Autowired
    OfferRepository offerRepository;

    /**
     * Item repository described here: {@link zti_spring_backend.repo.ItemRepository}
     */
    @Autowired
    ItemRepository itemRepository;

    /**
     * Comment repository described here: {@link zti_spring_backend.repo.CommentRepository}
     */
    @Autowired
    CommentRepository commentRepository;

    /**
     * Recommend repository described here: {@link zti_spring_backend.repo.RecommendRepository}
     */
    @Autowired
    RecommendRepository recommendRepository;

    /**
     * Order repository described here: {@link zti_spring_backend.repo.OrderRepository}
     */
    @Autowired
    OrderRepository orderRepository;

    /**
     * Auth service described here: {@link zti_spring_backend.auth.AuthService}
     */
    @Autowired
    AuthService authService;


    /**
     * Endpoint for getting all users.
     * User needs to be an administrator for this operation.
     * If user is not an admin throws {@link zti_spring_backend.exception.AdminException}
     * @return ResponseEntity with list of users and status code 200.
     */
    @GetMapping("/user")
    @Operation(summary = "Get all users", description = "Gets all users. If current user isn't admin, throws AdminException", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<User>> allUsers(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(auth.getName()));

        if(!user.getRole().equals("ADMIN"))
            throw new AdminException("You are not admin");

        return ResponseEntity.ok(userRepository.findAll());
    }

    /**
     * Endpoint for getting currently authenticated user.
     * User needs to be authenticated for this operation.
     * @return ResponseEntity with user and status code 200.
     */
    @GetMapping("/user/me")
    @Operation(summary = "Get current user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<User> findCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException(username)));
    }

    /**
     * Endpoint for getting user with id provided in path.
     * @param id id of user.
     * @return ResponseEntity with user and status code 200.
     */
    @GetMapping("/auth/user/{id}")
    @Operation(summary = "Get a user with matching id")
    public ResponseEntity<User> getUser(@PathVariable long id){
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id)));
    }

    /**
     * Endpoint for changing user password.
     * User needs to be authenticated for this operation.
     * @param passwordChangeRequest request containing old and new password.
     * @return ResponseEntity with AuthenticationResponse containing new JWT token.
     */
    @PostMapping("/user/change-password")
    @Operation(summary = "Change password of current user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<AuthenticationResponse> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(authService.changePassword(username, passwordChangeRequest.getPassword(), passwordChangeRequest.getNewPassword()));
    }

    /**
     * Endpoint for reseting user password.
     * User needs to be an administrator for this operation.
     * If user is not an administrator throws {@link zti_spring_backend.exception.AdminException}.
     * @param id id of user.
     * @return ResponseEntity with generated password.
     */
    @PutMapping("/user/reset-password/{id}")
    @Operation(summary = "Reset password for user", description="Resets password for user with matching id. If current user isn't admin throws AdminException", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<PasswordResetResponse> resetPassword(@PathVariable long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UserNotFoundException(id));

        if(!user.getRole().equals("ADMIN"))
            throw new AdminException("You are not admin");



        return ResponseEntity.ok(authService.resetPassword(id));
    }

    /**
     * Endpoint for editing currently authenticated user.
     * User needs to be authenticated for this operation.
     * @param user user data contained in RequestBody.
     * @return ResponseEntity with modified user and status code 200.
     */
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

    /**
     * Endpoint for deleting user and all his content from server.
     * User needs to be authenticated for this operation
     * @param email email contained in query string
     * @return ResponseEntity with success message and status code 200.
     */
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
