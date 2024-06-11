package zti_spring_backend.exception;

public class RecommendAlreadyExistsException extends RuntimeException{
    public RecommendAlreadyExistsException(long sellerId, long userId) {
        super("Recommend already exists for seller with id: " + sellerId + " and user with id: " + userId);
    }
}
