package zti_spring_backend.exception;

import java.time.LocalDate;

/**
 * Exception thrown when user tries to do invalid operation on an auction.
 */
public class OfferInvalidAuctionOperationException extends RuntimeException {
    /**
     * Constructor for exception when user tries to buy item from auction he didn't win.
     * @param id of auction.
     * @param userId id of user trying to do invalid operation.
     */
    public OfferInvalidAuctionOperationException(long id, long userId) {
        super("Invalid auction winner user id: " + userId + " for offer with id: " + id);
    }

    /**
     * Constructor for exception when user tries to participate in auction that has already ended.
     * @param localDate - date when auction has ended.
     */
    public OfferInvalidAuctionOperationException(LocalDate localDate) {
        super("Auction has already ended on " + localDate.toString());
    }
}
