package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Entity containing recommend data from table "recommend".
 */
@Entity(name="Recommend")
@Table(name="recommend")
public class Recommend {

    /**
     * Recommend id.
     */
    private long id;

    /**
     * Id of user who liked or disliked profile.
     */
    @Getter
    @Setter
    private long userid;

    /**
     * Id of user whose profile was liked or disliked.
     */
    @Getter
    @Setter
    private long sellerid;

    /**
     * Boolean if true the profile was liked otherwise profile was disliked.
     */
    @Getter
    @Setter
    private boolean liked;

    /**
     * Getter for generated id.
     * @return id of recommend.
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
