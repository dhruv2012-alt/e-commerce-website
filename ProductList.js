import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { fetchProducts } from "../services/api";

const categoryColors = {
  Electronics: { bg: "#f3f0ff", color: "#7c3aed" },
  Books:       { bg: "#fff0f0", color: "#f43f5e" },
  Clothing:    { bg: "#fff7ed", color: "#f97316" },
};

const ProductList = () => {
  const products = fetchProducts();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, cart, wishlist } = useContext(AppContext);

  return (
    <>
      <div className="page-header-row">
        <div className="page-header">
          <h2>Products</h2>
          <p>Browse and manage your store catalogue</p>
        </div>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{products.length} products</span>
      </div>

      <div className="product-grid">
        {products.map((p) => {
          const cat = categoryColors[p.category] || { bg: "#f0fdf4", color: "#10b981" };
          const inCart = cart.some(c => c.id === p.id);
          const inWish = wishlist.some(w => w.id === p.id);

          return (
            <div key={p.id} className="product-card">
              <img src={p.image || "https://via.placeholder.com/240x180"} alt={p.name} />
              <div className="product-card-body">
                <span
                  style={{
                    display: "inline-block",
                    background: cat.bg,
                    color: cat.color,
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 20,
                    padding: "2px 10px",
                    marginBottom: 6,
                  }}
                >
                  {p.category}
                </span>
                <h3>{p.name}</h3>
                <div className="product-price">${p.price.toFixed(2)}</div>

                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, padding: "8px 10px", fontSize: 13 }}
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    title={inCart ? "Already in cart" : "Add to cart"}
                    onClick={() => addToCart(p)}
                    style={{
                      width: 36, height: 36, border: "1px solid var(--border)",
                      borderRadius: 8, background: inCart ? "#f3f0ff" : "white",
                      fontSize: 16, cursor: "pointer", color: inCart ? "var(--primary)" : "var(--text-muted)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    🛒
                  </button>
                  <button
                    title={inWish ? "In wishlist" : "Add to wishlist"}
                    onClick={() => addToWishlist(p)}
                    style={{
                      width: 36, height: 36, border: "1px solid var(--border)",
                      borderRadius: 8, background: inWish ? "#fff0f0" : "white",
                      fontSize: 16, cursor: "pointer", color: inWish ? "#f43f5e" : "var(--text-muted)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;