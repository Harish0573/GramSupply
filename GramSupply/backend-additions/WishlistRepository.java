package com.gramsupply.wishlist;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    Optional<WishlistItem> findByCustomerIdAndProductId(String customerId, Long productId);
    List<WishlistItem> findAllByOrderByCreatedAtDesc();
}
