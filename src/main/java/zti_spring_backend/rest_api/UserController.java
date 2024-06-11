package zti_spring_backend.rest_api;

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
import zti_spring_backend.exception.ItemNotFoundException;
import zti_spring_backend.exception.UserNotFoundException;
import zti_spring_backend.model.User;
import zti_spring_backend.repo.*;

import java.util.List;

@RestController
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
    public ResponseEntity<List<User>> allUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/user/me")
    public ResponseEntity<User> findCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException(username)));
    }

    @GetMapping("/auth/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id){
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id)));
    }

    @PostMapping("/user/change-password")
    public ResponseEntity<AuthenticationResponse> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();

        return ResponseEntity.ok(authService.changePassword(username, passwordChangeRequest.getPassword(), passwordChangeRequest.getNewPassword()));
    }

    @PutMapping("/user/me")
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
    public ResponseEntity<String> deleteUser(HttpServletRequest req, HttpServletResponse resp, @RequestParam String email)
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
