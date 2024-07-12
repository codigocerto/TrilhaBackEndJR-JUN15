package com.navarro.codigo_certo.trilha_back_end_jr.repository;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username AND u.status.id = 1")
    Optional<User> findByUsernameAndActive(@Param("username") String username);

}
