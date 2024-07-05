package com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions;

public class UserNotFound extends RuntimeException{
    public UserNotFound(String message) {
        super(message);
    }
}
