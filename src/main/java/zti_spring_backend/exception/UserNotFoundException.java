package zti_spring_backend.exception;

/**
 * Exception thrown when user with provided parameters is not found.
 */
public class UserNotFoundException extends RuntimeException
{
    /**
     * Constructor for exception when user with provided id does not exist in database.
     * @param id invalid user id.
     */
    public UserNotFoundException(long id) {
        super("User with id " + id + " not found");
    }

    /**
     * Constructor for exception when user with provided email does not exist in database.
     * @param email invalid email.
     */
    public UserNotFoundException(String email) {
        super("User with email " + email + " not found");
    }
}
