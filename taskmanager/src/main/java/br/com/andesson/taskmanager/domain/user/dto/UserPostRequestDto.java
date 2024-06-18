package br.com.andesson.taskmanager.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO for receiving data from requests directed to the 'User' entity.
 */
public record UserPostRequestDto(
        @JsonProperty(value = "username")
        @NotNull(message = "Username is mandatory.")
        @NotBlank(message = "Username cannot be blank.")
        @Size(min = 3, max = 150, message = "Username must be between 3 and 150 characters.")
        String username,

        @JsonProperty(value = "password")
        @NotNull(message = "Password is mandatory.")
        @NotBlank(message = "Password cannot be blank.")
        String password
) {
}
