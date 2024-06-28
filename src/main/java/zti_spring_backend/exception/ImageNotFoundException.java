package zti_spring_backend.exception;

public class ImageNotFoundException extends RuntimeException {
    public ImageNotFoundException(long id) {
        super("Image with itemid " + id + " not found");
    }
}
