package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Order;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    public List<Order> findAllByBuyerid(Long buyerid);

    public void deleteAllByBuyerid(Long userId);

    public boolean existsById(Long id);
}
