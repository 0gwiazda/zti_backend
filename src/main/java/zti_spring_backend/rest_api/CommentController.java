package zti_spring_backend.rest_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.CommentNotFoundException;
import zti_spring_backend.model.Comment;
import zti_spring_backend.repo.CommentRepository;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;



    @GetMapping("/auth/comment/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable long id) {
        return ResponseEntity.ok(commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id)));
    }

    @GetMapping("/auth/comment/seller/{id}")
    public ResponseEntity<List<Comment>> getSellerComment(@PathVariable long id) {
        return ResponseEntity.ok(commentRepository.findBySellerid(id));
    }

    @PostMapping("/comment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @PutMapping("/comment/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable long id, @RequestBody Comment comment) {
        return ResponseEntity.ok(commentRepository.findById(id).map(oldComment -> {
            oldComment.setText(comment.getText());
            oldComment.setDateposted(comment.getDateposted());
            return commentRepository.save(oldComment);
        }).orElseGet(() -> commentRepository.save(comment)));
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable long id) {

        if(!commentRepository.existsById(id)) {
            throw new CommentNotFoundException(id);
        }

        commentRepository.deleteById(id);

        return ResponseEntity.ok("Comment deleted successfully");
    }
}
