package br.com.andesson.taskmanager.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.andesson.taskmanager.domain.user.model.User;

/**
 * Repository interface for managing 'User' entities.
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
  
    @Query("select u from User u where u.username = ?1")
    Optional<User> findUserByUsername(String username);
    

}
