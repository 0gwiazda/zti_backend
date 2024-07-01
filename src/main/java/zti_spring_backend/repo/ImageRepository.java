package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Image;

import java.util.Optional;

/**
 * Repository for image queries
 */
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    /**
     * Find image with provided item id.
     * @param itemid id of item.
     * @return image with provided item id or null if it wasn't found.
     */
    public Optional<Image> findByItemid(Long itemid);
}
