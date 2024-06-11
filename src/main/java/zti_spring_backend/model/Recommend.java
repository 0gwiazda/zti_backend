package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name="Recommend")
@Table(name="recommend")
public class Recommend {

    private long id;

    @Getter
    @Setter
    private long userid;

    @Getter
    @Setter
    private long sellerid;

    @Getter
    @Setter
    private boolean liked;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
