import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { fetchProducts } from "../services/api";
import { getRecommendations } from "../services/recommendations";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart, addToWishlist, cart, wishlist } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const all = fetchProducts();
    const found = all.find(p => p.id === parseInt(id));
    setProduct(found);
    if (found) {
      setRecommendations(getRecommendations([found], all));
    }
  }, [id]);

  if (!product) return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>Product not found</h3>
      <p>This product doesn't exist or was removed.</p>
    </div>
  );

  const inCart = cart.some(c => c.id === product.id);
  const inWish = wishlist.some(w => w.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}
      >
        ← Back to Products
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}>
        {/* Image */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src={product.image || "https://via.placeholder.com/400x320"}
            alt={product.name}
            style={{ width: "100%", height: 320, objectFit: "cover" }}
          />
        </div>

        {/* Info */}
        <div className="card">
          <span style={{
            background: "#f3f0ff", color: "var(--primary)",
            fontSize: 12, fontWeight: 600, borderRadius: 20,
            padding: "3px 12px", display: "inline-block", marginBottom: 12,
          }}>
            {product.category}
          </span>

          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{product.name}</h2>
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginBottom: 20 }}>
            ${product.price.toFixed(2)}
          </div>

          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 24 }}>
            High-quality {product.category.toLowerCase()} product. Designed for performance and comfort.
            Perfect for everyday use with premium build quality.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn-primary"
              style={{ flex: 1, padding: "12px 20px", fontSize: 15 }}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Cart!" : inCart ? "✓ In Cart" : "🛒 Add to Cart"}
            </button>
            <button
              onClick={() => addToWishlist(product)}
              style={{
                width: 48, height: 48, border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", background: inWish ? "#fff0f0" : "white",
                fontSize: 20, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {inWish ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {user && recommendations.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div className="card-header" style={{ marginBottom: 16 }}>
            <span className="card-title">✨ Recommended for You</span>
          </div>
          <div className="product-grid">
            {recommendations.map((r) => (
              <div key={r.id} className="product-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${r.id}`)}>
                <img src={r.image || "https://via.placeholder.com/240x160"} alt={r.name} />
                <div className="product-card-body">
                  <h3>{r.name}</h3>
                  <div className="product-price">${r.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;