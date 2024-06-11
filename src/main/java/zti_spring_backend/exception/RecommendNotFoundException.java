package zti_spring_backend.exception;

public class RecommendNotFoundException extends RuntimeException {
    public RecommendNotFoundException(long id) {
        super("Recommend with id: " + id + " not found");
    }
    public RecommendNotFoundException(long userid, long sellerid) {
        super("Recommend for user with id: " + userid + " and seller with id: " + sellerid + " not found");
    }
}
