package zti_spring_backend.exception;

/**
 * Exception for errors during logging in.
 */
public class AuthLoginException extends RuntimeException {
    /**
     * Default exception constructor if email or password are invalid.
     */
    public AuthLoginException() {
        super("Invalid email or password");
    }

    /**
     * Exception thrown when there is an invalid password.
     * @param email email of the user that tried to log in with invalid password.
     */
    public AuthLoginException(String email) {
        super("Invalid password for user " + email);
    }
}
