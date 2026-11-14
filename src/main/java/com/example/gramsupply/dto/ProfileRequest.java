package com.example.gramsupply.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ProfileRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 120)
        String name,

        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a 10 digit mobile number")
        String phone,

        @Email(message = "Enter a valid email address")
        @Size(max = 150)
        String email,

        @Size(max = 180) String organisation,
        @Size(max = 300) String address,
        @Size(max = 100) String city,
        @Size(max = 100) String district,
        @Size(max = 60) String state,

        @Pattern(regexp = "^$|^\\d{6}$", message = "PIN code must be 6 digits")
        String pincode

) {
}
