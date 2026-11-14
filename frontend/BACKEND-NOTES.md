# Storing orders, enquiries and wishlists in MySQL, and showing them in /admin

| Data | Already stored? | What the admin dashboard needs |
|---|---|---|
| Enquiries | Yes, the site posts to `POST /api/enquiries` | `GET /api/enquiries` (already exists) |
| Orders | Yes, checkout posts to `POST /api/orders` | **add** `GET /api/orders` and `PATCH /api/orders/{id}/status` |
| Wishlist | **No**, it was only kept in the browser | **add** `POST /api/wishlist` and `GET /api/wishlist/all` |

Ready-made code is in the `backend-additions/` folder:

1. Copy `WishlistItem.java`, `WishlistRepository.java` and `WishlistController.java` into your Spring Boot project. Change the `package` line to yours (Spring Boot 2: also replace `jakarta.persistence` with `javax.persistence`).
2. Paste the two methods from `OrderAdminSnippet.java` into your existing `OrderController` and rename things to match your code.
3. Restart the backend. With `spring.jpa.hibernate.ddl-auto=update` the `wishlist_items` table is created automatically (`wishlist.sql` has the SQL if you prefer to run it yourself).
4. Check MySQL: `SELECT * FROM wishlist_items;`, `SELECT * FROM orders;` and `SELECT * FROM enquiries;` (your real table names may differ).

## Locking the admin pages
- The frontend hides all links to `/admin` and asks for a passcode (`VITE_ADMIN_PASSCODE` in `frontend/.env`). That passcode is visible to anyone who inspects the website code, so treat it only as a convenience lock.
- The real protection must be in the backend: allow `GET /api/orders`, `PATCH /api/orders/*/status`, `GET /api/enquiries`, `PATCH /api/enquiries/*/status` and `GET /api/wishlist/all` only for an ADMIN role (the `@PreAuthorize` lines are commented in the code, ready to switch on).
