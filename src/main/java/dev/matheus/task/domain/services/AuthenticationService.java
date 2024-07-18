package dev.matheus.task.domain.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dev.matheus.task.domain.dtos.LoginResponseDTO;
import dev.matheus.task.domain.dtos.UsuarioLoginDTO;
import dev.matheus.task.domain.entities.Usuario;
import dev.matheus.task.domain.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository repository;
    private final TokenService tokenService;

    public LoginResponseDTO login(@Valid UsuarioLoginDTO user){
        var usuarioSenha = new UsernamePasswordAuthenticationToken(user.usuario(), user.senha());
        var auth = authenticationManager.authenticate(usuarioSenha);
        var token = tokenService.generateToken((Usuario)auth.getPrincipal());
        return new LoginResponseDTO(token);
    }

    public String register(UsuarioLoginDTO user){
        if(this.repository.findByUsuario(user.usuario()) != null){
            throw new DataIntegrityViolationException("Já existe um usuário registrado com o mesmo nome");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(user.senha());
        Usuario data = new Usuario(null, user.usuario(), encryptedPassword);
        repository.save(data);
        return "Usuario cadastrado com sucesso";
    }
}