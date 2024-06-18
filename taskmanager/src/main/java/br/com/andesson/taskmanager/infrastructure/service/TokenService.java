package br.com.andesson.taskmanager.infrastructure.service;

import java.time.Instant;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.com.andesson.taskmanager.domain.user.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtException;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${api.security.token.expiration-hours}")
    private int expirationHours;

    @Value("${api.security.token.timezone}")
    private String timeZone;

    public String generateToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(generateExpirationDate(now)))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    private Instant generateExpirationDate(Instant now) {
        return now.plusSeconds(expirationHours * 3600).atZone(ZoneId.of(timeZone)).toInstant();
    }

    public String validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
            return claims.getSubject(); 
        } catch (JwtException | IllegalArgumentException e) {
            // token inválido
            return null;
        }
    }
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                   .setSigningKey(secret)
                   .parseClaimsJws(token)
                   .getBody();
    }
}
