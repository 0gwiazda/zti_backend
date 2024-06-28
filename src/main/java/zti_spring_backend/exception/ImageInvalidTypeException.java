package zti_spring_backend.exception;

public class ImageInvalidTypeException extends RuntimeException {
    public ImageInvalidTypeException(String type) {
        super(type + " is not a valid image type");
    }
}
