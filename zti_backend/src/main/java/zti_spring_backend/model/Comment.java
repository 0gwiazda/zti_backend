package zti_spring_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Entity containing comment data from table "comment".
 */
@Entity(name="Comment")
@Table(name="comment")
public class Comment {

    /**
     * Commnent id.
     */
    private long id;

    /**
     * Id of seller that has a comment under his profile.
     */
    @Getter
    @Setter
    private long sellerid;

    /**
     * Id of user that posted a comment.
     */
    @Getter
    @Setter
    private long userid;

    /**
     * Text of comment.
     */
    @Getter
    @Setter
    private String text;

    /**
     * Date when comment was posted.
     */
    @Getter
    @Setter
    private String dateposted;

    /**
     * Getter for generated id.
     * @return id of comment.
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
