package dev.matheus.task.domain.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import dev.matheus.task.domain.enums.Status;

import java.time.LocalDateTime;

public record TarefaDTO(
        Long tarefaId,
        String descricao,
        Status status,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime dataCriacao,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime dataAtualizacao) {
}