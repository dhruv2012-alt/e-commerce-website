import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

// Checkout is embedded inside Cart.js now — kept as standalone fallback
const Checkout = () => {
  const { cart, setCart } = useContext(AppContext);

  const handleCheckout = () => {
    if (cart.length === 0) { alert("Your cart is empty!"); return; }
    alert(`✅ Thank you for your order! Total: $${cart.reduce((s, i) => s + i.price, 0).toFixed(2)}`);
    setCart([]);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button className="btn-primary" style={{ width: "100%", padding: 12, fontSize: 15 }} onClick={handleCheckout}>
        Confirm Order →
      </button>
    </div>
  );
};

export default Checkout;