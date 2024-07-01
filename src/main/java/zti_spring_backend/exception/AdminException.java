package zti_spring_backend.exception;

/**
 * Exception for Admin related errors.
 */
public class AdminException extends RuntimeException {
    /**
     * Method creating AdminException with provided message.
     * @param message message to be included in exception.
     */
    public AdminException(String message) {
        super(message);
    }
}
