package com.navarro.codigo_certo.trilha_back_end_jr.service.impl;

import com.navarro.codigo_certo.trilha_back_end_jr.config.security.TokenService;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.RequestLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.ResponseLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.RequestRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.ResponseRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;
import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.InvalidPassword;
import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.UserAlreadyExistsException;
import com.navarro.codigo_certo.trilha_back_end_jr.infra.exceptions.NotFound;
import com.navarro.codigo_certo.trilha_back_end_jr.repository.UsersRepository;
import com.navarro.codigo_certo.trilha_back_end_jr.service.AuthenticationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthenticationServiceImpl(UsersRepository usersRepository,
                                     PasswordEncoder passwordEncoder,
                                     TokenService tokenService) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Override
    public ResponseLogin login(RequestLogin request) {
        return this.usersRepository.findByUsername(request.username())
                .map(user -> {
                    if(this.passwordEncoder.matches(request.password(), user.getPassword())){
                        String token = this.tokenService.generateToken(user);
                        return new ResponseLogin(user.getName(), token);
                    }
                    throw new InvalidPassword("Invalid password!");
                }).orElseThrow(() ->
                        new NotFound(String.format("User with username %s not found!", request.username())));
    }

    @Override
    public ResponseRegister register(RequestRegister register) {
        this.usersRepository.findByUsername(register.username())
                .ifPresent(user -> {
                    throw new UserAlreadyExistsException(
                            String.format("User with username %s already exist!", register.username()));
                });

        var password = this.passwordEncoder.encode(register.password());
        User newUser = new User(register.name(), register.username(), password);
        this.usersRepository.save(newUser);
        String token = this.tokenService.generateToken(newUser);

        return new ResponseRegister(newUser.getName(), token);
    }
}
