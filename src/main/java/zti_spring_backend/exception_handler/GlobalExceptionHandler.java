package zti_spring_backend.exception_handler;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import zti_spring_backend.exception.*;

/**
 * Global exception handler for catching exceptions and returning ResponseEntity with appropriate message and status code.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Exception handler for UserNotFoundException.
     * @param e {@link zti_spring_backend.exception.UserNotFoundException}
     * @return ResponseEntity with exception message and 403 status code.
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> userNotFoundException(UserNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    /**
     * Exception handler for CommentNotFoundException.
     * @param e {@link zti_spring_backend.exception.CommentNotFoundException}
     * @return ResponseEntity with exception message and 404 status code.
     */
    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<String> commentNotFoundException(CommentNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Exception handler for ItemNotFoundException.
     * @param e {@link zti_spring_backend.exception.ItemNotFoundException}
     * @return ResponseEntity with exception message and 404 status code.
     */
    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<String> itemNotFoundException(ItemNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Exception handler for OfferNotFoundException.
     * @param e {@link zti_spring_backend.exception.OfferNotFoundException}
     * @return ResponseEntity with exception message and 404 status code.
     */
    @ExceptionHandler(OfferNotFoundException.class)
    public ResponseEntity<String> offerNotFoundException(OfferNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Exception handler for OfferInvalidPriceException
     * @param e {@link zti_spring_backend.exception.OfferInvalidPriceException}
     * @return ResponseEntity with exception message and 400 status code.
     */
    @ExceptionHandler(OfferInvalidPriceException.class)
    public ResponseEntity<String> offerInvalidPriceException(OfferInvalidPriceException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception handler for OfferInvalidItemCountException
     * @param e {@link zti_spring_backend.exception.OfferInvalidItemCountException}
     * @return ResponseEntity with exception message and 400 status code.
     */
    @ExceptionHandler(OfferInvalidItemCountException.class)
    public ResponseEntity<String> offerInvalidItemCountException(OfferInvalidItemCountException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception handler for OfferInvalidAuctionDataException
     * @param e {@link zti_spring_backend.exception.OfferInvalidAuctionDataException}
     * @return ResponseEntity with exception message and 401 status code.
     */
    @ExceptionHandler(OfferInvalidAuctionDataException.class)
    public ResponseEntity<String> offerInvalidAuctionDataException(OfferInvalidAuctionDataException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    /**
     * Exception handler for OfferInvalidAuctionOperationException
     * @param e {@link zti_spring_backend.exception.OfferInvalidAuctionOperationException}
     * @return ResponseEntity with exception message and 400 status code.
     */
    @ExceptionHandler(OfferInvalidAuctionOperationException.class)
    public ResponseEntity<String> offerInvalidAuctionOperationException(OfferInvalidAuctionOperationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception handler for RecommendNotFoundException
     * @param e {@link zti_spring_backend.exception.RecommendNotFoundException}
     * @return ResponseEntity with exception message and 404 status code.
     */
    @ExceptionHandler(RecommendNotFoundException.class)
    public ResponseEntity<String> recommendNotFoundException(RecommendNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Exception handler for RecommendAlreadyExistsException
     * @param e {@link zti_spring_backend.exception.RecommendAlreadyExistsException}
     * @return ResponseEntity with exception message and 400 status code.
     */
    @ExceptionHandler(RecommendAlreadyExistsException.class)
    public ResponseEntity<String> recommendAlreadyExistsException(RecommendAlreadyExistsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception handler for OrderNotFoundException
     * @param e {@link zti_spring_backend.exception.OrderNotFoundException}
     * @return ResponseEntity with exception message and 404 status code.
     */
    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<String> orderNotFoundException(OrderNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Exception handler for OrderInvalidQuantityException
     * @param e {@link zti_spring_backend.exception.OrderInvalidQuantityException}
     * @return ResponseEntity with exception message and 400 status code.
     */
    @ExceptionHandler(OrderInvalidQuantityException.class)
    public ResponseEntity<String> orderInvalidQuantityException(OrderInvalidQuantityException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception handler for AuthRegisterException
     * @param e {@link zti_spring_backend.exception.AuthRegisterException}
     * @return ResponseEntity with exception message and 403 status code.
     */
    @ExceptionHandler(AuthRegisterException.class)
    public ResponseEntity<String> authRegisterException(AuthRegisterException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    /**
     * Exception handler for AuthLoginException
     * @param e {@link zti_spring_backend.exception.AuthLoginException}
     * @return ResponseEntity with exception message and 403 status code.
     */
    @ExceptionHandler(AuthLoginException.class)
    public ResponseEntity<String> authLoginException(AuthLoginException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    /**
     * Exception handler for AdminException
     * @param e {@link zti_spring_backend.exception.AdminException}
     * @return ResponseEntity with exception message and 403 status code.
     */
    @ExceptionHandler(AdminException.class)
    public ResponseEntity<String> adminException(AdminException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }

    /**
     * Exception handler for ImageNotFoundException
     * @param e {@link zti_spring_backend.exception.ImageNotFoundException}
     * @return ResponseEntity with exception message and 404 status code.
     */
    @ExceptionHandler(ImageNotFoundException.class)
    public ResponseEntity<String> imageNotFoundException(ImageNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Exception handler for ImageInvalidTypeException
     * @param e {@link zti_spring_backend.exception.ImageInvalidTypeException}
     * @return ResponseEntity with exception message and 400 status code.
     */
    @ExceptionHandler(ImageInvalidTypeException.class)
    public ResponseEntity<String> imageInvalidTypeException(ImageInvalidTypeException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception handler for every other exception
     * @param e {@link Exception}
     * @return ResponseEntity with exception message and 500 status code.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exception(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
