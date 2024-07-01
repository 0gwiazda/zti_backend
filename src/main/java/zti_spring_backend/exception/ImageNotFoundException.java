package zti_spring_backend.exception;

/**
 * Exception thrown when image with provided parameters is not found.
 */
public class ImageNotFoundException extends RuntimeException {
    /**
     * Constructor for exception when image for a certain item does not exist in database.
     * @param id invalid itemid of image.
     */
    public ImageNotFoundException(long id) {
        super("Image with itemid " + id + " not found");
    }
}
