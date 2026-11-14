package com.example.gramsupply.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

public record OrderRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 120)
        String name,

        @Size(max = 180)
        String organisation,

        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a 10 digit mobile number")
        String phone,

        @Email(message = "Enter a valid email address")
        @Size(max = 150)
        String email,

        @NotBlank(message = "Address is required")
        @Size(max = 300)
        String address,

        @NotBlank(message = "Village or city is required")
        @Size(max = 100)
        String city,

        @NotBlank(message = "District is required")
        @Size(max = 100)
        String district,

        @NotBlank(message = "State is required")
        @Size(max = 60)
        String state,

        @NotBlank(message = "PIN code is required")
        @Pattern(regexp = "^\\d{6}$", message = "PIN code must be 6 digits")
        String pincode,

        @Size(max = 500)
        String notes,

        @NotBlank(message = "Choose a payment method")
        @Pattern(regexp = "upi|card|netbanking|bank|cod", message = "Unknown payment method")
        String paymentMethod,

        @Pattern(regexp = "^$|^\\d{4}$", message = "Card last 4 digits only")
        String cardLast4,

        @NotEmpty(message = "Add at least one product")
        List<@Valid EnquiryItemRequest> items

) {
}
