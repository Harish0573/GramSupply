-- Hibernate creates this table by itself when spring.jpa.hibernate.ddl-auto=update.
-- Run it by hand only if you manage the schema yourself.
CREATE TABLE IF NOT EXISTS wishlist_items (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id   VARCHAR(64)  NOT NULL,
  customer_name VARCHAR(255),
  phone         VARCHAR(20),
  product_id    BIGINT       NOT NULL,
  product_name  VARCHAR(255),
  price         DOUBLE,
  image         VARCHAR(1000),
  created_at    DATETIME,
  UNIQUE KEY uq_customer_product (customer_id, product_id)
);
-- check it:  SELECT * FROM wishlist_items ORDER BY created_at DESC;
