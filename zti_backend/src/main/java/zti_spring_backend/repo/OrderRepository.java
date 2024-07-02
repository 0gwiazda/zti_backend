package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Order;

import java.util.List;

/**
 * Repository for order operations.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Find all orders with matching buyer id.
     * @param buyerid id of buyer.
     * @return List of orders with matching buyer id.
     */
    public List<Order> findAllByBuyerid(Long buyerid);

    /**
     * Delete all orders with matching buyer id.
     * @param userId id of buyer.
     */
    public void deleteAllByBuyerid(Long userId);

    /**
     * Count orders with matching offer id.
     * @param offerid id of offer.
     * @return amount of orders with matching offer id.
     */
    public long countByOfferid(Long offerid);

    /**
     * Cheks if order with provided id exists.
     * @param id id of order
     * @return true if order with provided id exists otherwise returns false.
     */
    public boolean existsById(Long id);
}
