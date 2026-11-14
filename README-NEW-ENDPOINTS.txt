New in this version: customer accounts and orders

POST /api/auth/register   { name, phone, email, password }   -> { token, customer }
POST /api/auth/login      { identifier, password }           -> { token, customer }
GET  /api/auth/me         (Bearer token)                      -> customer
PUT  /api/auth/me         (Bearer token)                      -> updated customer
POST /api/auth/logout     (Bearer token)

POST /api/orders                    (Bearer token)  place an order
GET  /api/orders/my                 (Bearer token)  this customer's orders
POST /api/orders/{orderNumber}/cancel  (Bearer token)

Send the token as:  Authorization: Bearer <token>
Tables (customers, auth_tokens, customer_orders, order_items) are created
automatically because ddl-auto=update is already set.
New dependency in pom.xml: spring-security-crypto (BCrypt password hashing).
Run "mvn clean install" or reload Maven in your IDE after replacing the files.
