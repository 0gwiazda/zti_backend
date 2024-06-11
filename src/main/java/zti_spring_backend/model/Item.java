package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name="Item")
@Table(name="item")
public class Item {
    private long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private long price;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
