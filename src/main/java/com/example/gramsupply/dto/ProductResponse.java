package com.example.gramsupply.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponse(
        Long id,
        String name,
        String description,
        String imageUrl,
        BigDecimal price,
        boolean active,
        Long categoryId,
        String categoryName,
        LocalDateTime createdAt
) {}