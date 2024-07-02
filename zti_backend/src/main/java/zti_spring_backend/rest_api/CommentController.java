package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zti_spring_backend.exception.CommentNotFoundException;
import zti_spring_backend.model.Comment;
import zti_spring_backend.repo.CommentRepository;

import java.util.List;

/**
 * Controller for comment operations.
 */
@RestController
@Tag(name = "Comment Controller", description = "Controller for Comment operations")
public class CommentController {

    /**
     * Comment repository described here: {@link zti_spring_backend.repo.CommentRepository}
     */
    @Autowired
    private CommentRepository commentRepository;


    /**
     * Endpoint for getting a single comment with provided id in path.
     * If comment is not found throws CommentNotFoundException.
     * @param id id of comment.
     * @return ResponseEntity with comment and status code 200
     */
    @GetMapping("/auth/comment/{id}")
    @Operation(summary = "Finds and returns a single comment with id provided in path")
    public ResponseEntity<Comment> getComment(@PathVariable long id) {
        return ResponseEntity.ok(commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id)));
    }

    /**
     * Endpoint for getting all comments with provided seller id in path.
     * @param id of seller.
     * @return ResponseEntity with List of comments and status code 200.
     */
    @GetMapping("/auth/comment/seller/{id}")
    @Operation(summary = "Finds and returns all comments connected to user via sellerid")
    public ResponseEntity<List<Comment>> getSellerComment(@PathVariable long id) {
        return ResponseEntity.ok(commentRepository.findBySellerid(id));
    }

    /**
     * Endpoint for posting a comment.
     * User needs to be authenticated for this operation.
     * @param comment comment data in RequestBody.
     * @return ResponseEntity with created comment and status 200.
     */
    @PostMapping("/comment")
    @Operation(summary = "Add a single comment", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    /**
     * Endpoint for editing a comment with provided id.
     * User needs to be authenticated for this operation.
     * @param id id of comment
     * @param comment comment data in RequestBody.
     * @return ResponseEntity with edited comment and status 200.
     */
    @PutMapping("/comment/{id}")
    @Operation(summary = "Edit a comment with id provided in path", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Comment> updateComment(@PathVariable long id, @RequestBody Comment comment) {
        return ResponseEntity.ok(commentRepository.findById(id).map(oldComment -> {
            oldComment.setText(comment.getText());
            oldComment.setDateposted(comment.getDateposted());
            return commentRepository.save(oldComment);
        }).orElseGet(() -> commentRepository.save(comment)));
    }

    /**
     * Endpoint for deleting a comment with provided id.
     * If comment is not found throws CommentNotFoundException.
     * User needs to be authenticated for this operation.
     * @param id id of comment.
     * @return ResponseEntity with success message and status code 200.
     */
    @DeleteMapping("/comment/{id}")
    @Operation(summary = "Delete a comment with id provided in path", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteComment(@PathVariable long id) {

        if(!commentRepository.existsById(id)) {
            throw new CommentNotFoundException(id);
        }

        commentRepository.deleteById(id);

        return ResponseEntity.ok("Comment deleted successfully");
    }
}
