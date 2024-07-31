package dev.matheus.task.domain.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record UsuarioLoginDTO(
    @Schema(description = "Nome do usuário", example = "Matheus") String usuario,
    @Schema(description = "Senha do usuário", example = "123456") String senha) {
}
