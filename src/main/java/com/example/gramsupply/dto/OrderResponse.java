package com.example.gramsupply.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        String orderId,
        String status,
        LocalDateTime placedAt,
        BigDecimal total,
        String paymentMethod,
        String cardLast4,
        DeliveryInfo customer,
        List<ItemInfo> items
) {

    public record DeliveryInfo(
            String name,
            String organisation,
            String phone,
            String email,
            String address,
            String city,
            String district,
            String state,
            String pincode,
            String notes
    ) {
    }

    public record ItemInfo(
            Long productId,
            String name,
            Integer quantity,
            BigDecimal price
    ) {
    }
}
