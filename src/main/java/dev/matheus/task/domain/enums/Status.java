package dev.matheus.task.domain.enums;

public enum Status {
    PENDENTE(0, "PENDENTE"),
    CONCLUIDO(1, "CONCLUIDO"),
    CANCELADO(2, "CANCELADO");

    private final Integer codigo;
    private final String descricao;

    Status(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }
}