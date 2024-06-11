package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name="Offer")
@Table(name="offer")
public class Offer {
    private long id;

    @Getter
    @Setter
    private long itemid;

    @Getter
    @Setter
    private long itemcount;

    @Getter
    @Setter
    @Column(nullable = false)
    private boolean auction;

    @Getter
    @Setter
    private String startdate;

    @Getter
    @Setter
    private String enddate;

    @Getter
    @Setter
    private long sellerid;

    @Getter
    @Setter
    private long auctionuserid;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
