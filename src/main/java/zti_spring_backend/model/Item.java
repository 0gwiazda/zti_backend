package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Entity containing item data from "item" table.
 */
@Entity(name="Item")
@Table(name="item")
public class Item {

    /**
     * Item id.
     */
    private long id;

    /**
     * Item name.
     */
    @Getter
    @Setter
    private String name;

    /**
     * Item description.
     */
    @Getter
    @Setter
    private String description;

    /**
     * Item price.
     */
    @Getter
    @Setter
    private long price;

    /**
     * Getter for generated id.
     * @return id of item.
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
