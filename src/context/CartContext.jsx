import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /**
   * Agrega un producto al carrito o incrementa su cantidad si ya existe
   * @param {Object} product - Producto a agregar
   * @param {number} quantity - Cantidad a agregar
   */
  const addItem = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Si el producto ya existe, actualizar la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si el producto no existe, agregarlo
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  /**
   * Elimina un item del carrito
   * @param {string} itemId - ID del item a eliminar
   */
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  /**
   * Limpia todo el carrito
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Actualiza la cantidad de un item en el carrito
   * @param {string} itemId - ID del item
   * @param {number} quantity - Nueva cantidad
   */
  const updateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Calcula el total de unidades en el carrito
   * @returns {number} Total de unidades
   */
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Calcula el total del carrito
   * @returns {number} Total en dinero
   */
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  /**
   * Verifica si un producto está en el carrito
   * @param {string} productId - ID del producto
   * @returns {boolean} True si el producto está en el carrito
   */
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    updateItemQuantity,
    getTotalQuantity,
    getTotal,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
