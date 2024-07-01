package zti_spring_backend.exception;

/**
 * Exception thrown when offer with provided parameters is not found.
 */
public class OfferNotFoundException extends RuntimeException {
    /**
     * Constructor for exception when offer with provided id does not exist in database.
     * @param id invalid id.
     */
    public OfferNotFoundException(long id) {
        super("Offer with id " + id + " not found");
    }

    /**
     * Constructor for exception when offer does not belong to seller with provided id.
     * @param id of offer.
     * @param sellerId id of seller.
     */
    public OfferNotFoundException(long id, long sellerId) {
        super("Offer with id " + id + " with seller id " + sellerId + " not found");
    }
}
