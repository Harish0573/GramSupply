package com.gramsupply.wishlist; // change to your own package

import jakarta.persistence.*; // Spring Boot 2? use javax.persistence.* instead
import java.time.LocalDateTime;

/** One product saved by one customer. Public fields keep this file short. */
@Entity
@Table(name = "wishlist_items",
       uniqueConstraints = @UniqueConstraint(columnNames = {"customer_id", "product_id"}))
public class WishlistItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "customer_id", nullable = false) public String customerId;
    @Column(name = "customer_name") public String customerName;
    public String phone;
    @Column(name = "product_id", nullable = false) public Long productId;
    @Column(name = "product_name") public String productName;
    public Double price;
    @Column(length = 1000) public String image;
    @Column(name = "created_at") public LocalDateTime createdAt = LocalDateTime.now();
}
