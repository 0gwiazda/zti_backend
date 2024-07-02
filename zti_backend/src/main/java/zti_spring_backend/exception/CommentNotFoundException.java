package zti_spring_backend.exception;

/**
 * Exception thrown when comment with provided parameters is not found in the database.
 */
public class CommentNotFoundException extends RuntimeException {
    /**
     * Constructor for exception when comment with provided id does not exist in database.
     * @param id invalid comment id.
     */
     public CommentNotFoundException(long id) {
        super("Comment with id " + id + " not found");
    }
}
