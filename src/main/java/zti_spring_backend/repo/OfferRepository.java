package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Offer;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    @Query("SELECT o FROM Offer o WHERE o.sellerid = :sellerid AND o.itemcount > 0")
    public List<Offer> findBySelleridAvailable(@Param("sellerid") long sellerid);


    public List<Offer> findBySellerid(long sellerid);

    public Optional<Offer> findByItemid(long itemid);
}