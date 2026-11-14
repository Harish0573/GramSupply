package com.example.gramsupply.controller;

import com.example.gramsupply.dto.OrderRequest;
import com.example.gramsupply.dto.OrderResponse;
import com.example.gramsupply.security.AuthInterceptor;
import com.example.gramsupply.service.OrderService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @RequestAttribute(AuthInterceptor.CUSTOMER_ID) Long customerId,
            @Valid @RequestBody OrderRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(orderService.createOrder(customerId, request));
    }

    // Customer sees their own orders
    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> myOrders(
            @RequestAttribute(AuthInterceptor.CUSTOMER_ID) Long customerId) {

        return ResponseEntity.ok(orderService.getMyOrders(customerId));
    }

    @PostMapping("/{orderNumber}/cancel")
    public ResponseEntity<OrderResponse> cancel(
            @RequestAttribute(AuthInterceptor.CUSTOMER_ID) Long customerId,
            @PathVariable String orderNumber) {

        return ResponseEntity.ok(orderService.cancelOrder(customerId, orderNumber));
    }
}
