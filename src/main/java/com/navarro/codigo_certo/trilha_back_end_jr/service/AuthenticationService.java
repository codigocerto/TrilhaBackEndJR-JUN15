package com.navarro.codigo_certo.trilha_back_end_jr.service;

import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.RequestLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.login.ResponseLogin;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.RequestRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.dto.register.ResponseRegister;
import com.navarro.codigo_certo.trilha_back_end_jr.entity.User;

public interface AuthenticationService {
    ResponseLogin login(RequestLogin request);
    ResponseRegister register(RequestRegister register);
    void deleteUser(User user);
}
