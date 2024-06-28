package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import zti_spring_backend.model.Image;

import java.util.Optional;


public interface ImageRepository extends JpaRepository<Image, Long> {
    public Optional<Image> findByItemid(long itemid);
}
