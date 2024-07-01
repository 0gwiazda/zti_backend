package zti_spring_backend.exception;

/**
 * Exception thrown when file sent to database is not an image.
 */
public class ImageInvalidTypeException extends RuntimeException {
    /**
     * Constructor for exception when file isn't an image, for example this exception will be thrown if someone sends .txt file.
     * @param type of file that was sent.
     */
    public ImageInvalidTypeException(String type) {
        super(type + " is not a valid image type");
    }
}
