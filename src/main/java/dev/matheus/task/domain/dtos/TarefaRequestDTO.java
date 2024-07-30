package dev.matheus.task.domain.dtos;

import dev.matheus.task.domain.enums.Status;

public record TarefaRequestDTO(
        String descricao,
        Status status) {
}
