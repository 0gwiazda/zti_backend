package zti_spring_backend.exception;

import java.time.LocalDate;

/**
 * Exception throw when auction contains invalid data.
 */
public class OfferInvalidAuctionDataException extends RuntimeException {
    /**
     * Constructor for exception, when offer with provided id is not an auction.
     * @param id of offer.
     */
    public OfferInvalidAuctionDataException(long id){
        super("Offer with id: " + id + " is not an auction");
    }
}
