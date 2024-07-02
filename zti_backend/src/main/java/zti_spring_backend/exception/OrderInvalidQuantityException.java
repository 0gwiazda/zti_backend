package zti_spring_backend.exception;

/**
 * Exception thrown when order contains invalid quantity of items.
 */
public class OrderInvalidQuantityException extends RuntimeException {

    /**
     * Constructor for exception when order contains amount of items less or equal to zero.
     * @param quantity of items.
     */
    public OrderInvalidQuantityException(long quantity) {
        super("Order quantity is invalid: " + quantity + "\nQuantity should be greater than zero");
    }
}
