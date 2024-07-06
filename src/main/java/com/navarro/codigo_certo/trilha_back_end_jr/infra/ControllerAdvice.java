package com.navarro.codigo_certo.trilha_back_end_jr.infra;

import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.InvalidPassword;
import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.UserAlreadyExistsException;
import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.UserNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InvalidPassword.class)
    public ResponseEntity<DefaultMessage> invalidPasswordHandler(InvalidPassword exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new DefaultMessage(HttpStatus.FORBIDDEN, exception.getMessage()));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<DefaultMessage> userAlreadyExistsExceptionHandler(UserAlreadyExistsException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new DefaultMessage(HttpStatus.BAD_REQUEST, exception.getMessage()));
    }

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<DefaultMessage> userNotFoundHandler(UserNotFound exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new DefaultMessage(HttpStatus.NOT_FOUND, exception.getMessage()));
    }
}
