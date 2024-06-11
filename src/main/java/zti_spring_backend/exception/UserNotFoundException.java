package zti_spring_backend.exception;


public class UserNotFoundException extends RuntimeException
{
    public UserNotFoundException(long id) {
        super("User with id " + id + " not found");
    }

    public UserNotFoundException(String email) {
        super("User with email " + email + " not found");
    }
}
