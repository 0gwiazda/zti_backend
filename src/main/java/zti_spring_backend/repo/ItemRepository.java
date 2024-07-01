package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Item;

/**
 * Repository for item operations.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    /**
     * Check if item with provided id exists.
     * @param id item id.
     * @return true if item with this id exists otherwise false.
     */
    public boolean existsById(long id);
}
