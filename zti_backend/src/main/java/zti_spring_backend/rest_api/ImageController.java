package zti_spring_backend.rest_api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import zti_spring_backend.exception.ImageNotFoundException;
import zti_spring_backend.model.Image;
import zti_spring_backend.repo.ImageRepository;
import zti_spring_backend.services.ImageService;

import java.io.IOException;

/**
 * Controller for image operations.
 */
@RestController
@Tag(name = "Image Controller", description = "Controller for images")
public class ImageController {

    /**
     * Image repository described here: {@link zti_spring_backend.repo.ImageRepository}
     */
    @Autowired private ImageRepository imageRepository;

    /**
     * Image service described here: {@link zti_spring_backend.services.ImageService}
     */
    @Autowired private ImageService imageService;

    /**
     * Endpoint for posting an image.
     * User needs to be authenticated for this operation.
     * @param itemid id of item.
     * @param file image to be posted.
     * @return ResponseEntity with success message and status code 200.
     * @throws IOException If I/O exception occurs during file saving.
     */
    @PostMapping(value = "/image/{itemid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Image into database", description = "Uploads image as record containing path, name, type and itemid to database.", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> createImage(@PathVariable long itemid, @RequestParam MultipartFile file) throws IOException {

           Image image = imageService.saveImage(file, itemid);

           return ResponseEntity.ok("Image " + image.getFilename() + " saved successfully");

    }

    /**
     * Endpoint for getting an image with provided item id in path.
     * @param itemid id of item.
     * @return ResponseEntity with BLOB of requested image.
     */
    @GetMapping("/auth/image/{itemid}")
    @Operation(summary = "Sends image as a Blob to client")
    public ResponseEntity<?> getImage(@PathVariable long itemid) {
        try {
            byte[] image = imageService.getImage(itemid);
            return ResponseEntity.ok(image);
        }
        catch (Exception e) {
            return null;
        }
    }

    /**
     * Endpoint for deleting images with provided itemid in path.
     * User needs to be authenticated for this operation.
     * @param itemid id of item.
     * @return ResponseEntity with success message and status code 200.
     * @throws IOException if I/O exception occurs during file operations.
     */
    @DeleteMapping("/image/{itemid}")
    @Operation(summary = "Deletes image from database", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteImage(@PathVariable long itemid) throws IOException {
        String check = imageService.deleteImage(itemid);

        if (check == null)
            throw new ImageNotFoundException(itemid);


        return ResponseEntity.ok(check);
    }
}
