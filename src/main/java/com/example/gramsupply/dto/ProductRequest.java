package com.example.gramsupply.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductRequest(

        @NotBlank
        @Size(max = 180)
        String name,

        @Size(max = 2000)
        String description,

        String imageUrl,

        @DecimalMin("0.0")
        BigDecimal price,

        @NotNull
        Long categoryId

) {}