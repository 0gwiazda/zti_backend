package zti_spring_backend.exception;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(long id) {
        super("Order with id " + id + " not found");
    }
}
