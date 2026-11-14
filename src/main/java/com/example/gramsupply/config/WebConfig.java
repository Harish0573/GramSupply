package com.example.gramsupply.config;

import com.example.gramsupply.security.AuthInterceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;

    public WebConfig(AuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // only these need a logged in customer, products and enquiries stay open
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/auth/me", "/api/auth/logout", "/api/orders", "/api/orders/**");
    }
}
