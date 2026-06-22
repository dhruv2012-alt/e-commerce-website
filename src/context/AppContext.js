import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null);

  // Cart state
  const [cart, setCart] = useState([]);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    // Avoid duplicates
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Add product to wishlist
  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Set user on login
  const login = (userInfo) => setUser(userInfo);

  // Clear user on logout
  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};