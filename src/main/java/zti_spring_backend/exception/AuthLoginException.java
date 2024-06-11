package zti_spring_backend.exception;

public class AuthLoginException extends RuntimeException {
    public AuthLoginException() {
        super("Invalid email or password");
    }
    public AuthLoginException(String email) {
        super("Invalid password for user " + email);
    }
}
