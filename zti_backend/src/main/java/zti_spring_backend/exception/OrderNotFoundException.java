package zti_spring_backend.exception;

/**
 * Exception thrown when order with provided parameters is not found.
 */
public class OrderNotFoundException extends RuntimeException{
    /**
     * Exception thrown when item with provided id does not exist in database.
     * @param id invalid order id.
     */
    public OrderNotFoundException(long id) {
        super("Order with id " + id + " not found");
    }
}
