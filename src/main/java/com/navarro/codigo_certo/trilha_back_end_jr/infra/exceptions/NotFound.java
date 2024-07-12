package com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions;

public class NotFound extends RuntimeException{
    public NotFound(String message) {
        super(message);
    }
}
