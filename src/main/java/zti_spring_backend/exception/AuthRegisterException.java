package zti_spring_backend.exception;

/**
 * Authentication exception thrown if error occurs during registration.
 */
public class AuthRegisterException extends RuntimeException{
    /**
     * Constructor for exception when user tries to create an account on email, that already exists in database.
     * @param email provided in registration.
     */
    public AuthRegisterException(String email) {
        super("User with email " + email + " already exists");
    }
}
