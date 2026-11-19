package com.gramsupply.wishlist;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:8081")
public class WishlistController {
    private final WishlistRepository repo;
    public WishlistController(WishlistRepository repo) { this.repo = repo; }

    public record WishlistRequest(String customerId, String customerName, String phone,
                                  Long productId, String productName, Double price,
                                  String image, boolean saved) {}

    /** Called by the website when a logged-in customer taps the heart. */
    @PostMapping
    public ResponseEntity<?> save(@RequestBody WishlistRequest r) {
        if (r.customerId() == null || r.productId() == null)
            return ResponseEntity.badRequest().body(Map.of("error", "customerId and productId are required"));
        var existing = repo.findByCustomerIdAndProductId(r.customerId(), r.productId());
        if (r.saved()) {
            if (existing.isEmpty()) {
                var w = new WishlistItem();
                w.customerId = r.customerId(); w.customerName = r.customerName(); w.phone = r.phone();
                w.productId = r.productId(); w.productName = r.productName(); w.price = r.price(); w.image = r.image();
                repo.save(w);
            }
        } else {
            existing.ifPresent(repo::delete);
        }
        return ResponseEntity.ok(Map.of("ok", true));
    }

    /** Used by the admin dashboard. Restrict to admins in your security config. */
    // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<WishlistItem> all() { return repo.findAllByOrderByCreatedAtDesc(); }
}
