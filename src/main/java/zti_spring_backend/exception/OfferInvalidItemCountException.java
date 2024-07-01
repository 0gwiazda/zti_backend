package zti_spring_backend.exception;

/**
 * Exception thrown when user tries to buy more items than stated in offer.
 */
public class OfferInvalidItemCountException extends RuntimeException{

    /**
     * Constructor for exception when user tries to buy more items than stated.
     * @param count how many items are stated in offer.
     * @param id of offer.
     */
    public OfferInvalidItemCountException(long count, long id) {
        super("Invalid quantity for offer with id: " + id + "\nQuantity should be less than or equal to " + count);
    }
}
