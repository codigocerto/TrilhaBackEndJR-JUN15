package dev.matheus.task.domain.dtos;

import dev.matheus.task.domain.enums.Status;

public record TarefaRequestDTO(
        Long tarefaId,
        String descricao,
        Status status) {
}
