package com.navarro.codigo_certo.trilha_back_end_jr.controller;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.RequestLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.ResponseLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.RequestRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.ResponseRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.service.AuthenticateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticateService authenticateService;

    public AuthenticationController(AuthenticateService authenticateService) {
        this.authenticateService = authenticateService;
    }

    @PostMapping("register")
    public ResponseEntity<ResponseRegister> register(@RequestBody RequestRegister register) {
        ResponseRegister response = this.authenticateService.register(register);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("login")
    public ResponseEntity<ResponseLogin> login(@RequestBody RequestLogin login) {
        ResponseLogin response = this.authenticateService.login(login);
        return ResponseEntity.ok().body(response);
    }
}




