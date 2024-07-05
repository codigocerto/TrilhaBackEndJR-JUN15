package com.navarro.codigo_certo.trilha_back_end_jr.service.impl;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.RequestLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.ResponseLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.RequestRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.ResponseRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.repository.UsersRepository;
import com.navarro.codigo_certo.trilha_back_end_jr.service.AuthenticateService;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateServiceImpl implements AuthenticateService {

    private final UsersRepository usersRepository;

    public AuthenticateServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public ResponseLogin login(RequestLogin request) {
        return null;
    }

    @Override
    public ResponseRegister register(RequestRegister register) {
        return null;
    }
}
