package com.example.gramsupply.dto;

import java.time.LocalDateTime;

// the password hash is never part of this
public record CustomerResponse(
        String customerId,
        String name,
        String phone,
        String email,
        String organisation,
        String address,
        String city,
        String district,
        String state,
        String pincode,
        LocalDateTime createdAt
) {
}
