package br.com.andesson.taskmanager.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * DTO for responding to requests directed to the 'User' entity.
 * This DTO represents public user information, including the username.
 */
@Data
public class UserResponseDto {

    /**
     * The username of the user.
     */
    @JsonProperty("username")
    private String username;

    /**
     * The password of the user.
     */
    @JsonProperty("password")
    private String password;

}
