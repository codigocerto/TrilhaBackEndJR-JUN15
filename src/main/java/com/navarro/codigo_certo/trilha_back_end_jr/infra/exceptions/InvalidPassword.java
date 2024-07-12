package com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions;

public class InvalidPassword extends RuntimeException{
    public InvalidPassword(String message) {
        super(message);
    }
}
