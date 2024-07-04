package com.navarro.codigo_certo.trilha_back_end_jr.repository;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TasksRepository extends JpaRepository<Tasks, Long> {
}
