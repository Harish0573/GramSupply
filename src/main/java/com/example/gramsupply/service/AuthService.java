package com.example.gramsupply.service;

import com.example.gramsupply.dto.AuthResponse;
import com.example.gramsupply.dto.CustomerResponse;
import com.example.gramsupply.dto.LoginRequest;
import com.example.gramsupply.dto.ProfileRequest;
import com.example.gramsupply.dto.RegisterRequest;
import com.example.gramsupply.entity.AuthToken;
import com.example.gramsupply.entity.Customer;
import com.example.gramsupply.repository.AuthTokenRepository;
import com.example.gramsupply.repository.CustomerRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@Transactional
public class AuthService {

    private static final int TOKEN_DAYS = 30;

    private final CustomerRepository customerRepository;
    private final AuthTokenRepository tokenRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SecureRandom random = new SecureRandom();

    public AuthService(
            CustomerRepository customerRepository,
            AuthTokenRepository tokenRepository
    ) {
        this.customerRepository = customerRepository;
        this.tokenRepository = tokenRepository;
    }

    public AuthResponse register(RegisterRequest request) {

        String phone = request.phone().trim();
        String email = clean(request.email());

        if (customerRepository.existsByPhone(phone)) {
            throw new IllegalArgumentException(
                    "An account with this mobile number already exists");
        }

        if (!email.isEmpty() && customerRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists");
        }

        Customer customer = new Customer();
        customer.setCustomerCode(newCustomerCode());
        customer.setName(request.name().trim());
        customer.setPhone(phone);
        customer.setEmail(email);
        customer.setPasswordHash(passwordEncoder.encode(request.password()));

        Customer saved = customerRepository.save(customer);

        return new AuthResponse(createToken(saved), toResponse(saved));
    }

    public AuthResponse login(LoginRequest request) {

        String identifier = request.identifier().trim();

        Customer customer = (identifier.contains("@")
                ? customerRepository.findByEmailIgnoreCase(identifier)
                : customerRepository.findByPhone(identifier))
                .orElse(null);

        // same message for both cases so nobody can check which accounts exist
        if (customer == null
                || !passwordEncoder.matches(request.password(), customer.getPasswordHash())) {
            throw new IllegalArgumentException("Wrong mobile/email or password");
        }

        return new AuthResponse(createToken(customer), toResponse(customer));
    }

    @Transactional(readOnly = true)
    public CustomerResponse getProfile(Long customerId) {
        return toResponse(findCustomer(customerId));
    }

    public CustomerResponse updateProfile(Long customerId, ProfileRequest request) {

        Customer customer = findCustomer(customerId);

        String phone = request.phone().trim();
        String email = clean(request.email());

        if (!phone.equals(customer.getPhone()) && customerRepository.existsByPhone(phone)) {
            throw new IllegalArgumentException(
                    "Another account already uses this mobile number");
        }

        if (!email.isEmpty()
                && !email.equalsIgnoreCase(customer.getEmail())
                && customerRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException(
                    "Another account already uses this email");
        }

        customer.setName(request.name().trim());
        customer.setPhone(phone);
        customer.setEmail(email);
        customer.setOrganisation(clean(request.organisation()));
        customer.setAddress(clean(request.address()));
        customer.setCity(clean(request.city()));
        customer.setDistrict(clean(request.district()));
        customer.setState(clean(request.state()));
        customer.setPincode(clean(request.pincode()));

        return toResponse(customerRepository.save(customer));
    }

    public void logout(String token) {
        tokenRepository.findByToken(token).ifPresent(tokenRepository::delete);
    }

    private Customer findCustomer(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
    }

    private String createToken(Customer customer) {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);

        AuthToken token = new AuthToken();
        token.setToken(Base64.getUrlEncoder().withoutPadding().encodeToString(bytes));
        token.setCustomer(customer);
        token.setExpiresAt(LocalDateTime.now().plusDays(TOKEN_DAYS));

        return tokenRepository.save(token).getToken();
    }

    private String newCustomerCode() {
        String code;
        do {
            code = "GSC" + String.format("%07d", random.nextInt(10_000_000));
        } while (customerRepository.existsByCustomerCode(code));
        return code;
    }

    private String clean(String value) {
        return value == null ? "" : value.trim();
    }

    private CustomerResponse toResponse(Customer c) {
        return new CustomerResponse(
                c.getCustomerCode(),
                c.getName(),
                c.getPhone(),
                c.getEmail(),
                c.getOrganisation(),
                c.getAddress(),
                c.getCity(),
                c.getDistrict(),
                c.getState(),
                c.getPincode(),
                c.getCreatedAt()
        );
    }
}
