
package com.example.gramsupply.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "enquiries")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 140)
    private String customerName;

    @Column(nullable = false, length = 180)
    private String email;

    @Column(nullable = false, length = 25)
    private String phone;

    private String organization;

    private String message;

    @Column(nullable = false, length = 30)
    private String status = "PENDING";

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(
            mappedBy = "enquiry",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<EnquiryItem> items = new ArrayList<>();

    public Enquiry() {
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public void addItem(EnquiryItem item) {
        items.add(item);
        item.setEnquiry(this);
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<EnquiryItem> getItems() {
        return items;
    }
}
