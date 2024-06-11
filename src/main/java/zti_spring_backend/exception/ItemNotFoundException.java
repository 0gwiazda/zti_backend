package zti_spring_backend.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(long id) {
        super("Item with id " + id + " not found");
    }
}
