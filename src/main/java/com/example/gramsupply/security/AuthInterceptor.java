package com.example.gramsupply.security;

import com.example.gramsupply.entity.AuthToken;
import com.example.gramsupply.repository.AuthTokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;

// Checks the "Authorization: Bearer <token>" header on customer-only URLs.
// The controllers read the customer id from the request attribute.
@Component
public class AuthInterceptor implements HandlerInterceptor {

    public static final String CUSTOMER_ID = "customerId";
    public static final String TOKEN = "authToken";

    private final AuthTokenRepository tokenRepository;

    public AuthInterceptor(AuthTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        // browsers send an OPTIONS request first (CORS), let it through
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String value = header.substring(7).trim();

            AuthToken token = tokenRepository.findByToken(value).orElse(null);

            if (token != null && token.getExpiresAt().isAfter(LocalDateTime.now())) {
                request.setAttribute(CUSTOMER_ID, token.getCustomer().getId());
                request.setAttribute(TOKEN, value);
                return true;
            }
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"Please sign in again\"}");
        return false;
    }
}
