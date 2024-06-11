package zti_spring_backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Recommend;

import java.util.Optional;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    public void deleteAllBySellerid(Long sellerId);
    public void deleteAllByUserid(Long buyerId);

    public long countBySelleridAndLiked(Long sellerId, Boolean liked);
    public Optional<Recommend> findBySelleridAndUserid(Long sellerId, Long userid);
    public boolean existsBySelleridAndUserid(Long sellerId, Long userid);

    public boolean existsById(Long id);
}
