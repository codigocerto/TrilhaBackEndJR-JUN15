package br.com.andesson.taskmanager.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuration class for Spring Security settings.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private SecurityFilter securityFilter;

    /**
     * Configures the security filter chain for HTTP requests.
     *
     * @param http The HttpSecurity object to configure security settings.
     * @return A SecurityFilterChain instance configured with custom security settings.
     * @throws Exception If an error occurs while configuring security.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/api/v1/users/user").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class); 
        
        return http.build();
    }

    /**
     * Configures the password encoder for encoding and verifying passwords.
     *
     * @return A PasswordEncoder instance (BCryptPasswordEncoder).
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures the authentication manager to authenticate users.
     *
     * @param authenticationConfiguration The AuthenticationConfiguration object for retrieving the authentication manager.
     * @return An AuthenticationManager instance.
     * @throws Exception If an error occurs while retrieving the authentication manager.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
