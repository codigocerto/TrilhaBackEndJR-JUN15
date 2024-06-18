package br.com.andesson.taskmanager.domain.user.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.andesson.taskmanager.domain.user.model.User;

/**
 * Repository interface for managing 'User' entities.
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
