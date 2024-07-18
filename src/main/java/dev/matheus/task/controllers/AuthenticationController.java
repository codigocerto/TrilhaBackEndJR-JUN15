package dev.matheus.task.controllers;

import dev.matheus.task.domain.dtos.LoginResponseDTO;
import dev.matheus.task.domain.dtos.UsuarioLoginDTO;
import dev.matheus.task.domain.services.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<LoginResponseDTO> login(@RequestBody UsuarioLoginDTO user){
        return ResponseEntity.ok().body(service.login(user));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody UsuarioLoginDTO user){
        service.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}