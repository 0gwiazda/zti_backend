package zti_spring_backend.exception;

/**
 * Exception thrown when item with provided parameters is not found in database.
 */
public class ItemNotFoundException extends RuntimeException {
    /**
     * Constructor for exception when item with provided id does not exist in database.
     * @param id invalid id.
     */
    public ItemNotFoundException(long id) {
        super("Item with id " + id + " not found");
    }
}
