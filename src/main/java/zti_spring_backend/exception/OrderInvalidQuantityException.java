package zti_spring_backend.exception;

public class OrderInvalidQuantityException extends RuntimeException {
    public OrderInvalidQuantityException(long quantity) {
        super("Order quantity is invalid: " + quantity + "\nQuantity should be greater than zero");
    }
}
