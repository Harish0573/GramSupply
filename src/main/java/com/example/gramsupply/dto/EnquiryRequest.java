
package com.example.gramsupply.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record EnquiryRequest(

        @NotBlank(message = "Customer name is required")
        @Size(max = 120)
        String customerName,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email address")
        @Size(max = 150)
        String email,

        @NotBlank(message = "Phone number is required")
        String phone,

        @Size(max = 180)
        String organization,

        @NotBlank(message = "Please describe your requirements")
        @Size(max = 2000)
        String message,

        List<@Valid EnquiryItemRequest> items

) {
}
