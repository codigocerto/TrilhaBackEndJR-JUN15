package dev.matheus.task.controllers;

import dev.matheus.task.domain.dtos.LoginResponseDTO;
import dev.matheus.task.domain.dtos.UsuarioLoginDTO;
import dev.matheus.task.domain.services.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication API")
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioLoginDTO user) {
        try {
            LoginResponseDTO loginResponse = service.login(user);
            return ResponseEntity.ok().body(loginResponse);
        } catch (AuthenticationException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Credenciais inválidas. Por favor, tente novamente.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UsuarioLoginDTO user) {
        service.register(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuário criado com sucesso");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}