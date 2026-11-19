// Add these two methods to your EXISTING OrderController (the one that already has
// /api/orders, /api/orders/my and /api/orders/{id}/cancel). Adjust names to match your code.

@GetMapping                                   // GET /api/orders  -> every order, newest first
// @PreAuthorize("hasRole('ADMIN')")
public List<Order> allOrders() {
    return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "placedAt"));
}

@PatchMapping("/{orderId}/status")            // PATCH /api/orders/ORD123/status  {"status":"SHIPPED"}
// @PreAuthorize("hasRole('ADMIN')")
public Order updateStatus(@PathVariable String orderId, @RequestBody Map<String, String> body) {
    Order o = orderRepository.findByOrderId(orderId).orElseThrow();
    o.setStatus(body.get("status"));
    return orderRepository.save(o);
}
