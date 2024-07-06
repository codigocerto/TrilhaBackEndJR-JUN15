package com.navarro.codigo_certo.trilha_back_end_jr.controller;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.RequestLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.ResponseLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.RequestRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.ResponseRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;
import com.navarro.codigo_certo.trilha_back_end_jr.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationService authenticateService;

    public AuthenticationController(AuthenticationService authenticateService) {
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

    @DeleteMapping("delete")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal User user) {
        this.authenticateService.deleteUser(user);
        return ResponseEntity.ok().build();
    }
}




