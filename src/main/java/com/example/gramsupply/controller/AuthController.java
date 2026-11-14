package com.example.gramsupply.controller;

import com.example.gramsupply.dto.AuthResponse;
import com.example.gramsupply.dto.CustomerResponse;
import com.example.gramsupply.dto.LoginRequest;
import com.example.gramsupply.dto.ProfileRequest;
import com.example.gramsupply.dto.RegisterRequest;
import com.example.gramsupply.security.AuthInterceptor;
import com.example.gramsupply.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Create a new customer account
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

    // Logged in customer's own profile
    @GetMapping("/me")
    public ResponseEntity<CustomerResponse> me(
            @RequestAttribute(AuthInterceptor.CUSTOMER_ID) Long customerId) {

        return ResponseEntity.ok(authService.getProfile(customerId));
    }

    @PutMapping("/me")
    public ResponseEntity<CustomerResponse> updateProfile(
            @RequestAttribute(AuthInterceptor.CUSTOMER_ID) Long customerId,
            @Valid @RequestBody ProfileRequest request) {

        return ResponseEntity.ok(authService.updateProfile(customerId, request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestAttribute(AuthInterceptor.TOKEN) String token) {

        authService.logout(token);
        return ResponseEntity.noContent().build();
    }
}
