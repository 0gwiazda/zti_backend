package zti_spring_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import zti_spring_backend.model.User;

import java.util.Optional;

/**
 * Repository for user operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user with provided email.
     * @param email user email.
     * @return user with matching email otherwise returns null.
     */
    public Optional<User> findByEmail(String email);

    /**
     * Delete user with matching email.
     * @param email user email.
     */
    public void deleteByEmail(String email);
}
