package com.navarro.codigo_certo.trilha_back_end_jr.repository;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
}
