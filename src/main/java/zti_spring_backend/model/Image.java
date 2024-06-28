package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name="Image")
@Table(name="image")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {
    private long id;


    @Getter
    @Setter
    private long itemid;

    @Getter
    @Setter
    private String filename;

    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    private String filepath;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
