import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, { ...item, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeFromCart = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const updatedItems = cartItems.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const cartItemsCount = cartItems.length;

  // console.log("cartItems", cartItems);

  return {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    cartItemsCount,
  };
};
