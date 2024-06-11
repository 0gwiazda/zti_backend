package zti_spring_backend.exception;

public class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException(long id) {
        super("Comment with id " + id + " not found");
    }
}
