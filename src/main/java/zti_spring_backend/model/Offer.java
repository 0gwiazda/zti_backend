package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Entity for offer data from "offer" table
 */
@Entity(name="Offer")
@Table(name="offer")
public class Offer {

    /**
     * Offer id.
     */
    private long id;

    /**
     * Id of item listed in offer.
     */
    @Getter
    @Setter
    private long itemid;

    /**
     * Quantity of items in offer.
     */
    @Getter
    @Setter
    private long itemcount;

    /**
     * Boolean dictating if offer is an auction or not.
     */
    @Getter
    @Setter
    @Column(nullable = false)
    private boolean auction;

    /**
     * Start date of auction. If offer isn't an auction this field can be null.
     */
    @Getter
    @Setter
    private String startdate;

    /**
     * End date of auction. If offer isn't an auction this field can be null.
     */
    @Getter
    @Setter
    private String enddate;

    /**
     * Id of seller listing an offer.
     */
    @Getter
    @Setter
    private long sellerid;

    /**
     * Id of user that is currently winning an auction. If no user has participated in auction this field is equal to zero.
     */
    @Getter
    @Setter
    private long auctionuserid;

    /**
     * Getter for generated id.
     * @return id of offer.
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
