package com.navarro.codigo_certo.trilha_back_end_jr.infra;

import org.springframework.http.HttpStatus;

public record DefaultMessage(HttpStatus status, String message) {
}
