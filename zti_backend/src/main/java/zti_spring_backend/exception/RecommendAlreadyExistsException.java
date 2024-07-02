package zti_spring_backend.exception;

/**
 * Exception thrown when user tries to like or dislike already liked or disliked profile.
 */
public class RecommendAlreadyExistsException extends RuntimeException{

    /**
     * Constructor for exception when user already liked or disliked a seller.
     * @param sellerId id of seller that user liked or disliked.
     * @param userId id of user trying to do invalid operation.
     */
    public RecommendAlreadyExistsException(long sellerId, long userId) {
        super("Recommend already exists for seller with id: " + sellerId + " and user with id: " + userId);
    }
}
