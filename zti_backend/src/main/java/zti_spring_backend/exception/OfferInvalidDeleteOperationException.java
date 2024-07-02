package zti_spring_backend.exception;

/**
 * Exception thrown when offer cannot be deleted.
 */
public class OfferInvalidDeleteOperationException extends RuntimeException{
    /**
     * Constructor for exception when offer cannot be deleted.
     * @param message contains reason why offer cannot be deleted.
     */
    public OfferInvalidDeleteOperationException(String message) {
        super(message);
    }
}
