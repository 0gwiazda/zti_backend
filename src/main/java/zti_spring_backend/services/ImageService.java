package zti_spring_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import zti_spring_backend.exception.ImageInvalidTypeException;
import zti_spring_backend.model.Image;
import zti_spring_backend.repo.ImageRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Service for image operations.
 */
@Service
public class ImageService {

    /**
     * Path to folder containing images.
     */
    @Value("${images.upload-dir}")
    private String uploadDir;

    /**
     * Image repository described here: {@link zti_spring_backend.repo.ImageRepository}
     */
    @Autowired
    private ImageRepository imageRepository;

    private static final List<String> ALLOWED_FILE_TYPES = Arrays.asList(".jpeg", ".png", ".gif", ".jpg");

    /**
     * Image operation for saving an image in database.
     * Image is saved locally in specified folder, while important data described in {@link zti_spring_backend.model.Image} is uploaded into database.
     * If file is not an image (.png, .jpg, .jpeg, .gif) throws {@link zti_spring_backend.exception.ImageInvalidTypeException}
     * @param file file sent to backend.
     * @param itemid id of item that is on image
     * @return image record.
     * @throws IOException if I/O exception occurs during file operations.
     */
    public Image saveImage(MultipartFile file, long itemid) throws IOException {
        String fileType = file.getOriginalFilename();

        if(fileType != null)
            fileType = fileType.substring(file.getOriginalFilename().lastIndexOf("."));

        if (fileType == null || !ALLOWED_FILE_TYPES.contains(fileType))
            throw new ImageInvalidTypeException(fileType);


        Path path = Paths.get(System.getProperty("user.dir") + "/" + uploadDir, "images");
        String dataPath = "/" + uploadDir + "/images/" + file.getOriginalFilename();

        if(!Files.exists(path))
            Files.createDirectories(path);

        String filePath = Paths.get(path.toString(), file.getOriginalFilename()).toString();

        System.out.println(filePath);
        file.transferTo(new File(filePath));

        return imageRepository.save(Image.builder()
                .filename(file.getOriginalFilename())
                .itemid(itemid)
                .type(file.getContentType())
                .filepath(dataPath)
                .build());
    }

    /**
     * Image operation for downloading image.
     * Image with specified id is converted to byte array.
     * @param itemid id of item with this image.
     * @return image data as byte array.
     * @throws IOException if I/O exception occurs during file operations.
     */
    public byte[] getImage(long itemid) throws IOException {
        Optional<Image> image = imageRepository.findByItemid(itemid);

        String filePath = System.getProperty("user.dir") + image.get().getFilepath();
        byte[] imageData = Files.readAllBytes(new File(filePath).toPath());

        return imageData;
    }

    /**
     * Image operation for deleting image.
     * Image data is deleted from database and from local folder.
     * @param itemid id of item with this image.
     * @return success message.
     * @throws IOException if I/O exception occurs during file operations.
     */
    public String deleteImage(long itemid) throws IOException {
        Optional<Image> image = imageRepository.findByItemid(itemid);
        String filePath = image.get().getFilepath();
        File file = new File(filePath);
        boolean check = file.delete();

        if(!check)
            return null;

        imageRepository.deleteById(image.get().getId());

        return "Successfully deleted";
    }
}
