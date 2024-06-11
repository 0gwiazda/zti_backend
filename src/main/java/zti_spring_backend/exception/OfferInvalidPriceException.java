package zti_spring_backend.exception;

public class OfferInvalidPriceException extends RuntimeException {
    public OfferInvalidPriceException(long id, long price) {
        super("Invalid price for offer with id: " + id + "\nPrice should be greather than " + price/100. + "$");
    }
}
