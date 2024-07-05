package com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
