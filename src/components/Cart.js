import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cart, removeFromCart, setCart } = useContext(AppContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`✅ Order placed! Total: $${total.toFixed(2)}`);
    setCart([]);
  };

  return (
    <>
      <div className="page-header">
        <h2>Your Cart</h2>
        <p>{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
      </div>

      {cart.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Browse products and add items to get started.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }}>
          {/* Items */}
          <div className="card">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  className="cart-item-img"
                  src={item.image || "https://via.placeholder.com/60"}
                  alt={item.name}
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span>{item.category}</span>
                </div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <button className="btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="card">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="cart-total">
              <span>Total</span>
              <span style={{ color: "var(--primary)" }}>${total.toFixed(2)}</span>
            </div>
            <button className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 15, marginTop: 12 }} onClick={handleCheckout}>
              Confirm Order →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;