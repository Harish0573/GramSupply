package com.example.gramsupply.dto;

import java.time.LocalDateTime;
import java.util.List;

public record EnquiryResponse(
        Long id,
        String customerName,
        String email,
        String phone,
        String organization,
        String message,
        String status,
        LocalDateTime createdAt,
        List<EnquiryItemResponse> items
) {
    public record EnquiryItemResponse(
            Long productId,
            String productName,
            Integer quantity
    ) {}
}