package com.navarro.codigo_certo.trilha_back_end_jr.repository;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TasksRepository extends JpaRepository<Task, Long> {
    List<Task> findAllTasksByUserId(Long id);
    Optional<Task> findTaskByIdAndUserId(Long taskId, Long userId);
}
