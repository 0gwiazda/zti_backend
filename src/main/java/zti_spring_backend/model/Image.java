package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity containing image data from table "image".
 */
@Entity(name="Image")
@Table(name="image")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {

    /**
     * Image id.
     */
    private long id;


    /**
     * Id of item for which image was posted.
     */
    @Getter
    @Setter
    private long itemid;

    /**
     * Name for example "example.png".
     */
    @Getter
    @Setter
    private String filename;

    /**
     * Type of image, for example ".png"
     */
    @Getter
    @Setter
    private String type;

    /**
     * Path to image.
     */
    @Getter
    @Setter
    private String filepath;

    /**
     * Getter for generated id.
     * @return id of image.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    /**
     * Setter for id.
     * @param id to be set.
     */
    public void setId(long id) {
        this.id = id;
    }
}
