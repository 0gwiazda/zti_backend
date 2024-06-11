package zti_spring_backend.exception;

public class OfferNotFoundException extends RuntimeException {
    public OfferNotFoundException(long id) {
        super("Offer with id " + id + " not found");
    }

    public OfferNotFoundException(long id, long sellerId) {
        super("Offer with id " + id + " with seller id " + sellerId + " not found");
    }
}
