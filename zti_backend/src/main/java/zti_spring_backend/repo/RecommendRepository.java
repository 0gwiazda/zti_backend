package zti_spring_backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Recommend;

import java.util.Optional;

/**
 * Repository for recommend operations.
 */
@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {

    /**
     * Delete all recommends with matching seller id.
     * @param sellerId id of seller.
     */
    public void deleteAllBySellerid(Long sellerId);

    /**
     * Delete all recommends with matching user id.
     * @param userId id of user.
     */
    public void deleteAllByUserid(Long userId);

    /**
     * Count likes or dislikes under seller profile with provided id.
     * @param sellerId id of seller.
     * @param liked true for counting likes, false for coubnting dislikes.
     * @return number of likes or dislikes.
     */
    public long countBySelleridAndLiked(Long sellerId, Boolean liked);

    /**
     * Find recommend with matching user and seller id.
     * @param sellerId id of seller.
     * @param userid id of user.
     * @return recommend with matching user and seller id otherwise returns null.
     */
    public Optional<Recommend> findBySelleridAndUserid(Long sellerId, Long userid);

    /**
     * Check if recommend with matching user and seller id exists.
     * @param sellerId id of seller.
     * @param userid id of user.
     * @return true if recommend with matching user and seller id was found otherwise returns false.
     */
    public boolean existsBySelleridAndUserid(Long sellerId, Long userid);

    /**
     * Check if recommend with provided id exists.
     * @param id of recommend.
     * @return true if recommend with matching id exists else returns false.
     */
    public boolean existsById(Long id);
}
