import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(AppContext);

  return (
    <>
      <div className="page-header">
        <h2>Your Wishlist</h2>
        <p>{wishlist.length} saved {wishlist.length === 1 ? "item" : "items"}</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h3>Your wishlist is empty</h3>
            <p>Save products you love to revisit them later.</p>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image || "https://via.placeholder.com/240x160"} alt={item.name} />
              <div className="product-card-body">
                <h3>{item.name}</h3>
                <div className="product-category">{item.category}</div>
                <div className="product-price">${item.price.toFixed(2)}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, padding: "8px 10px", fontSize: 13 }}
                    onClick={() => addToCart(item)}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    className="btn-danger"
                    style={{ padding: "8px 10px" }}
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Wishlist;