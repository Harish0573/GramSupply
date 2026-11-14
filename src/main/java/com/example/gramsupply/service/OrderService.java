package com.example.gramsupply.service;

import com.example.gramsupply.dto.EnquiryItemRequest;
import com.example.gramsupply.dto.OrderRequest;
import com.example.gramsupply.dto.OrderResponse;
import com.example.gramsupply.entity.Customer;
import com.example.gramsupply.entity.CustomerOrder;
import com.example.gramsupply.entity.OrderItem;
import com.example.gramsupply.entity.Product;
import com.example.gramsupply.repository.CustomerOrderRepository;
import com.example.gramsupply.repository.CustomerRepository;
import com.example.gramsupply.repository.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private final CustomerOrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SecureRandom random = new SecureRandom();

    public OrderService(
            CustomerOrderRepository orderRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository
    ) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    public OrderResponse createOrder(Long customerId, OrderRequest request) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        CustomerOrder order = new CustomerOrder();
        order.setOrderNumber(newOrderNumber());
        order.setCustomer(customer);
        order.setName(request.name().trim());
        order.setOrganisation(request.organisation());
        order.setPhone(request.phone());
        order.setEmail(request.email());
        order.setAddress(request.address().trim());
        order.setCity(request.city().trim());
        order.setDistrict(request.district().trim());
        order.setState(request.state().trim());
        order.setPincode(request.pincode());
        order.setNotes(request.notes());
        order.setPaymentMethod(request.paymentMethod());
        order.setCardLast4(
                "card".equals(request.paymentMethod()) ? request.cardLast4() : null);

        BigDecimal total = BigDecimal.ZERO;
        boolean allPriced = true;

        for (EnquiryItemRequest itemRequest : request.items()) {

            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Product not found: " + itemRequest.productId()));

            if (!product.isActive()) {
                throw new IllegalArgumentException(
                        "Product is not available: " + product.getName());
            }

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setUnitPrice(product.getPrice());
            item.setQuantity(itemRequest.quantity());
            order.addItem(item);

            // the price always comes from the database, never from the browser
            BigDecimal price = product.getPrice();
            if (price == null || price.signum() <= 0) {
                allPriced = false;
            } else {
                total = total.add(price.multiply(BigDecimal.valueOf(itemRequest.quantity())));
            }
        }

        order.setTotal(allPriced ? total : null);

        return toResponse(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(Long customerId) {
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public OrderResponse cancelOrder(Long customerId, String orderNumber) {

        CustomerOrder order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        // a customer can only touch their own orders
        if (!order.getCustomer().getId().equals(customerId)) {
            throw new IllegalArgumentException("Order not found");
        }

        if (!"PLACED".equals(order.getStatus())) {
            throw new IllegalArgumentException(
                    "This order can no longer be cancelled");
        }

        order.setStatus("CANCELLED");

        return toResponse(orderRepository.save(order));
    }

    private String newOrderNumber() {
        String number;
        do {
            number = "GS" + String.format("%08d", random.nextInt(100_000_000));
        } while (orderRepository.existsByOrderNumber(number));
        return number;
    }

    private OrderResponse toResponse(CustomerOrder o) {

        List<OrderResponse.ItemInfo> items = o.getItems().stream()
                .map(i -> new OrderResponse.ItemInfo(
                        i.getProductId(),
                        i.getProductName(),
                        i.getQuantity(),
                        i.getUnitPrice()))
                .toList();

        OrderResponse.DeliveryInfo delivery = new OrderResponse.DeliveryInfo(
                o.getName(),
                o.getOrganisation(),
                o.getPhone(),
                o.getEmail(),
                o.getAddress(),
                o.getCity(),
                o.getDistrict(),
                o.getState(),
                o.getPincode(),
                o.getNotes()
        );

        return new OrderResponse(
                o.getOrderNumber(),
                o.getStatus(),
                o.getCreatedAt(),
                o.getTotal(),
                o.getPaymentMethod(),
                o.getCardLast4(),
                delivery,
                items
        );
    }
}
