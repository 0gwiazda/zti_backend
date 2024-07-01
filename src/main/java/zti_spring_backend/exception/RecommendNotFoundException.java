package zti_spring_backend.exception;

/**
 * Exception thrown when recommend with provided parameters is not found.
 */
public class RecommendNotFoundException extends RuntimeException {

    /**
     * Exception thrown when recommend with provided id does not exist in database.
     * @param id invalid recommend id.
     */
    public RecommendNotFoundException(long id) {
        super("Recommend with id: " + id + " not found");
    }
}
