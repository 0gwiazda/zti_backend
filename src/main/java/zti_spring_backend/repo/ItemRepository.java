package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    public boolean existsById(long id);
}
