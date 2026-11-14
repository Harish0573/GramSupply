# GramSupply Frontend (React + Vite)

NovaPhone-style e-commerce UI for GramSupply (blue + orange theme).

## Run
    npm install
    npm run dev      # http://localhost:5173
    npm run build

## Where things are
- src/index.css          colors (:root variables), fonts, shared buttons/forms
- src/components/        Navbar, HomeHero, CategoryStrip, ProductCard, Footer
- src/pages/             Home, Products, ProductDetails, Cart, Login, Info (About/Contact/Enquiry)
- src/data/              categories.js, products.js (sample data), art.js (placeholder images)
- src/context/           demo AuthContext + useAuth
- src/utils/cart.js      localStorage cart helpers

## Use your own data / photos
Replace src/data/products.js and categories.js with yours (keep field names), and put photos in
public/images, then use image: "/images/name.jpg".

## Change colors
Edit the :root block at the top of src/index.css.
