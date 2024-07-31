package dev.matheus.task.domain.dtos;

import dev.matheus.task.domain.enums.Status;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;

public record TarefaRequestDTO(
    @Schema(description = "Descrição da tarefa", example = "Ir ao mercado comprar pão e leite") String descricao,
    @Schema(description = "Status da tarefa", example = "PENDENTE", allowableValues = {
        "PENDENTE", "CONCLUIDO",
        "CANCELADO" }) @Pattern(regexp = "PENDENTE|CONCLUIDO|CANCELADO", message = "Status deve ser PENDENTE, CONCLUIDO ou CANCELADO") Status status){
}
