package zti_spring_backend.rest_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import zti_spring_backend.exception.ImageNotFoundException;
import zti_spring_backend.model.Image;
import zti_spring_backend.repo.ImageRepository;
import zti_spring_backend.services.ImageService;

import java.io.IOException;

@RestController
public class ImageController {

    @Autowired private ImageRepository imageRepository;
    @Autowired private ImageService imageService;

    @PostMapping("/image/{itemid}")
    public ResponseEntity<String> createImage(@PathVariable long itemid, @RequestParam("file") MultipartFile file) throws IOException {

           Image image = imageService.saveImage(file, itemid);

           return ResponseEntity.ok("Image " + image.getFilename() + " saved successfully");

    }

    @GetMapping("/auth/image/{itemid}")
    public ResponseEntity<?> getImage(@PathVariable long itemid) {
        try {
            byte[] image = imageService.getImage(itemid);
            return ResponseEntity.ok(image);
        }
        catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/image/{itemid}")
    public ResponseEntity<String> deleteImage(@PathVariable long itemid) throws IOException {
        String check = imageService.deleteImage(itemid);

        if (check == null)
            throw new ImageNotFoundException(itemid);


        return ResponseEntity.ok(check);
    }
}
