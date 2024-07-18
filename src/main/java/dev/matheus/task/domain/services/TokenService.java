package dev.matheus.task.domain.services;

import dev.matheus.task.domain.entities.Usuario;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("task-api")
                    .withSubject(user.getUsuario())
                    .withExpiresAt(generateExpirationDateToken())
                    .sign(algorithm);
        }catch (JWTCreationException e){
            return e.getMessage();
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("task-api")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException e){
            return "";
        }
    }

    private Instant generateExpirationDateToken(){
        int tempoLogado = 8;
        return LocalDateTime.now().plusHours(tempoLogado).toInstant(ZoneOffset.of("-03:00"));
    }
}