package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Entity for order data from table "userorder"
 */
@Entity(name="userorder")
@Table(name="userorder")
public class Order {

    /**
     * Order id.
     */
    private long id;

    /**
     * Id of offer with bought items.
     */
    @Getter
    @Setter
    private long offerid;

    /**
     * Quantity of bought items.
     */
    @Getter
    @Setter
    private long quantity;

    /**
     * Id of user who bought items.
     */
    @Getter
    @Setter
    private long buyerid;

    /**
     * Getter for generated id.
     * @return id of order.
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
