package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Offer;

import java.util.List;
import java.util.Optional;

/**
 * Repository for offer operations.
 */
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    /**
     * Search offers that are available and contain provided seller id.
     * @param sellerid id of seller.
     * @return List of offers matching above criteria.
     */
    @Query("SELECT o FROM Offer o WHERE o.sellerid = :sellerid AND o.itemcount > 0")
    public List<Offer> findBySelleridAvailable(@Param("sellerid") long sellerid);

    /**
     * Find all offers with provided seller id.
     * @param sellerid id of seller.
     * @return List of offers with matching seller id.
     */
    public List<Offer> findBySellerid(long sellerid);

    /**
     * Find offer with provided item id.
     * @param itemid id of item.
     * @return offer with matching item id otherwise return null.
     */
    public Optional<Offer> findByItemid(long itemid);
}