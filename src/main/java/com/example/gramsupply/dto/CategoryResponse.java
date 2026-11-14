package com.example.gramsupply.dto;

public record CategoryResponse(
        Long id,
        String name,
        String description,
        boolean active
) {}