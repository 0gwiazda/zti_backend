package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Comment;

import java.util.List;

/**
 * Repository for comment queries.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    /**
     * Find comments with provided seller id.
     * @param sellerid id of seller.
     * @return List of comments with provided seller id.
     */
    public List<Comment> findBySellerid(long sellerid);

    /**
     * Checks if comment with provided id exists.
     * @param id comment id.
     * @return true if comment exists else false.
     */
    public boolean existsById(long id);

    /**
     * Deletes all comments with provided seller id.
     * @param sellerid id of seller.
     */
    public void deleteAllBySellerid(long sellerid);

    /**
     * Deletes all comments with provided user id.
     * @param userid id of user.
     */
    public void deleteAllByUserid(long userid);
}
