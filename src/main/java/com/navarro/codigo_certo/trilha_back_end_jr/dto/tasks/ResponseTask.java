package com.navarro.codigo_certo.trilha_back_end_jr.dto.tasks;

import com.navarro.codigo_certo.trilha_back_end_jr.entity.Task;

public record ResponseTask(
        Long id,
        String description) {

    public static ResponseTask toResponseTask(Task task) {
        return new ResponseTask(task.getId(), task.getDescription());
    }
}
