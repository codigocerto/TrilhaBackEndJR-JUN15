package com.navarro.codigo_certo.trilha_back_end_jr.repository;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
