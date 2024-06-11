package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.Comment;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    public List<Comment> findBySellerid(long sellerid);
    public boolean existsById(long id);

    public void deleteAllBySellerid(long sellerid);
    public void deleteAllByUserid(long userid);
}
