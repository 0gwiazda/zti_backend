package zti_spring_backend.exception;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class OfferInvalidAuctionDataException extends RuntimeException {
    public OfferInvalidAuctionDataException(LocalDate localDate) {
        super("Auction has already ended on " + localDate.toString());
    }

    public OfferInvalidAuctionDataException(long id, long userId) {
        super("Invalid auction winner user id: " + userId + " for offer with id: " + id);
    }

    public OfferInvalidAuctionDataException(long id){
        super("Offer with id: " + id + " is not an auction");
    }
}
