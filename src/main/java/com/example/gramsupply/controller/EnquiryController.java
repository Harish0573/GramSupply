
package com.example.gramsupply.controller;

import com.example.gramsupply.dto.EnquiryRequest;
import com.example.gramsupply.dto.EnquiryResponse;
import com.example.gramsupply.service.EnquiryService;

import jakarta.validation.Valid;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    // Customer submits an enquiry
    @PostMapping
    public ResponseEntity<EnquiryResponse> createEnquiry(
            @Valid @RequestBody EnquiryRequest request) {

        EnquiryResponse response =
                enquiryService.createEnquiry(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Admin can view all enquiries
    @GetMapping
    public ResponseEntity<?> getAllEnquiries() {
        return ResponseEntity.ok(
                enquiryService.getAllEnquiries()
        );
    }

    // Admin can view one enquiry
    @GetMapping("/{id}")
    public ResponseEntity<EnquiryResponse> getEnquiryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                enquiryService.getEnquiryById(id)
        );
    }
}
