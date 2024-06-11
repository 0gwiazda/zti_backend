package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name="userorder")
@Table(name="userorder")
public class Order {
    private long id;

    @Getter
    @Setter
    private long offerid;

    @Getter
    @Setter
    private long quantity;

    @Getter
    @Setter
    private long buyerid;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
