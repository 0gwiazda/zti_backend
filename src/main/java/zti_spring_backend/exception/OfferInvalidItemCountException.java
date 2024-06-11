package zti_spring_backend.exception;

public class OfferInvalidItemCountException extends RuntimeException{
    public OfferInvalidItemCountException(long count, long id) {
        super("Invalid quantity for offer with id: " + id + "\nQuantity should be less than or equal to " + count);
    }
}
