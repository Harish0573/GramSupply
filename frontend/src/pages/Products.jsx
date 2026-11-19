import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "./Products.css";

function Products() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const search = (params.get("search") || "").toLowerCase();
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let out = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!search ||
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)),
    );
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [category, search, sort]);

  return (
    <div className="container page">
      <div className="pl-head">
        <div>
          <h1>{category || (search ? `Results for "${search}"` : "All products")}</h1>
          <p className="sub">{list.length} products</p>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      {list.length === 0 ? (
        <p className="notice">No products found. Try another search or category.</p>
      ) : (
        <div className="pl-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
