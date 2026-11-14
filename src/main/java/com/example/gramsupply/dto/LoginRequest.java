package com.example.gramsupply.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(

        @NotBlank(message = "Mobile number or email is required")
        String identifier,

        @NotBlank(message = "Password is required")
        String password

) {
}
