package zti_spring_backend.exception;

/**
 * Exception thrown when user tries to participate in auction for less or equal money than stated in current price.
 */
public class OfferInvalidPriceException extends RuntimeException {
    /**
     * Constructor for exception when user tries to participate in auction for invalid amount of money.
     * @param id of auction.
     * @param price that user has to increase.
     */
    public OfferInvalidPriceException(long id, long price) {
        super("Invalid price for offer with id: " + id + "\nPrice should be greather than " + price/100. + "$");
    }
}
