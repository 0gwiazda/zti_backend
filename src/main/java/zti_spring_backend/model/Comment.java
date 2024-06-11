package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name="Comment")
@Table(name="comment")
public class Comment {
    private long id;

    @Getter
    @Setter
    private long sellerid;

    @Getter
    @Setter
    private long userid;

    @Getter
    @Setter
    private String text;

    @Getter
    @Setter
    private String dateposted;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
