package com.example.gramsupply.service;

import com.example.gramsupply.dto.EnquiryRequest;
import com.example.gramsupply.dto.EnquiryItemRequest;
import com.example.gramsupply.dto.EnquiryResponse;
import com.example.gramsupply.entity.Enquiry;
import com.example.gramsupply.entity.EnquiryItem;
import com.example.gramsupply.entity.Product;
import com.example.gramsupply.repository.EnquiryRepository;
import com.example.gramsupply.repository.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final ProductRepository productRepository;

    public EnquiryService(
            EnquiryRepository enquiryRepository,
            ProductRepository productRepository
    ) {
        this.enquiryRepository = enquiryRepository;
        this.productRepository = productRepository;
    }

    public EnquiryResponse createEnquiry(EnquiryRequest request) {

        Enquiry enquiry = new Enquiry();

        enquiry.setCustomerName(request.customerName());
        enquiry.setEmail(request.email());
        enquiry.setPhone(request.phone());
        enquiry.setOrganization(request.organization());
        enquiry.setMessage(request.message());
        enquiry.setStatus("PENDING");

        for (EnquiryItemRequest itemRequest : request.items()) {

            Product product = productRepository.findById(
                    itemRequest.productId()
            ).orElseThrow(() ->
                    new IllegalArgumentException(
                            "Product not found: " + itemRequest.productId()
                    )
            );

            if (!product.isActive()) {
                throw new IllegalArgumentException(
                        "Product is not available: " + product.getName()
                );
            }

            EnquiryItem item = new EnquiryItem();

            item.setProduct(product);
            item.setQuantity(itemRequest.quantity());

            enquiry.addItem(item);
        }

        Enquiry saved = enquiryRepository.save(enquiry);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<EnquiryResponse> getAllEnquiries() {

        return enquiryRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EnquiryResponse getEnquiryById(Long id) {

        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Enquiry not found")
                );

        return toResponse(enquiry);
    }

    public EnquiryResponse updateEnquiryStatus(
            Long id,
            String status
    ) {

        List<String> allowedStatuses = List.of(
                "PENDING", "REVIEWED", "APPROVED", "REJECTED", "COMPLETED"
        );

        String normalizedStatus = status.toUpperCase();

        if (!allowedStatuses.contains(normalizedStatus)) {
            throw new IllegalArgumentException("Invalid enquiry status");
        }

        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Enquiry not found")
                );

        enquiry.setStatus(normalizedStatus);

        return toResponse(enquiryRepository.save(enquiry));
    }

    private EnquiryResponse toResponse(Enquiry enquiry) {

        List<EnquiryResponse.EnquiryItemResponse> items =
                enquiry.getItems().stream()
                        .map(item ->
                                new EnquiryResponse.EnquiryItemResponse(
                                        item.getProduct().getId(),
                                        item.getProduct().getName(),
                                        item.getQuantity()
                                )
                        )
                        .toList();

        return new EnquiryResponse(
                enquiry.getId(),
                enquiry.getCustomerName(),
                enquiry.getEmail(),
                enquiry.getPhone(),
                enquiry.getOrganization(),
                enquiry.getMessage(),
                enquiry.getStatus(),
                enquiry.getCreatedAt(),
                items
        );
    }
}