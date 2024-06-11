package zti_spring_backend.exception;

public class AuthRegisterException extends RuntimeException{
    public AuthRegisterException(String email) {
        super("User with email " + email + " already exists");
    }
}
