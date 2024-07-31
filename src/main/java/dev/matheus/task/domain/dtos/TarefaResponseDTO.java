package dev.matheus.task.domain.dtos;

import dev.matheus.task.domain.enums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record TarefaResponseDTO(
        Long id,
        String descricao,
        Status status,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime dataCriacao,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime dataAtualizacao) {
}
