package zti_spring_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import zti_spring_backend.exception.ImageInvalidTypeException;
import zti_spring_backend.model.Image;
import zti_spring_backend.repo.ImageRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Value("${images.upload-dir}")
    private String uploadDir;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    private static final List<String> ALLOWED_FILE_TYPES = Arrays.asList("image/jpeg", "image/png", "image/gif");

    public Image saveImage(MultipartFile file, long itemid) throws IOException {
        String fileType = file.getContentType();

        if (fileType == null || !ALLOWED_FILE_TYPES.contains(fileType))
            throw new ImageInvalidTypeException(fileType);


        Path path = Paths.get(uploadDir, "images");

        if(!Files.exists(path))
            Files.createDirectories(path);

        String filePath = Paths.get(path.toString(), file.getOriginalFilename()).toString();

        System.out.println(filePath);
        file.transferTo(new File(filePath));

        Image image = imageRepository.save(Image.builder()
                        .filename(file.getOriginalFilename())
                        .itemid(itemid)
                        .type(file.getContentType())
                        .filepath(filePath)
                .build());

        return image;
    }

    public byte[] getImage(long itemid) throws IOException {
        Optional<Image> image = imageRepository.findByItemid(itemid);

        String filePath = image.get().getFilepath();
        byte[] imageData = Files.readAllBytes(new File(filePath).toPath());

        return imageData;
    }

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
