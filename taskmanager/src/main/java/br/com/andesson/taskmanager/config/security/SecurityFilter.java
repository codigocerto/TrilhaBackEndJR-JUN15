package br.com.andesson.taskmanager.config.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.andesson.taskmanager.domain.user.model.User;
import br.com.andesson.taskmanager.domain.user.repository.UserRepository;
import br.com.andesson.taskmanager.infrastructure.service.TokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Custom filter to handle security authentication based on JWT token.
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    /**
     * Filter method to process incoming requests.
     *
     * @param request     The HTTP request object.
     * @param response    The HTTP response object.
     * @param filterChain The filter chain for invoking subsequent filters.
     * @throws ServletException If an error occurs during servlet processing.
     * @throws IOException      If an I/O error occurs.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = recoverToken(request);
        String username = tokenService.validateToken(token);

        if (username != null) {
            User user = userRepository.findUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Retrieves the JWT token from the Authorization header.
     *
     * @param request The HTTP request object.
     * @return The JWT token extracted from the Authorization header.
     */
    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}
