package dev.matheus.task.domain.services;

import dev.matheus.task.domain.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizationService implements UserDetailsService {
    private final UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        return repository.findByUsuario(usuario);
    }
}