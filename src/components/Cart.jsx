import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

/**
 * Componente que muestra el contenido del carrito de compras
 */
const Cart = () => {
  const { cartItems, removeItem, updateItemQuantity, clearCart, getTotal } =
    useCart();

  const total = getTotal();
  const formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(total);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="cart-titulo">Carrito de Compras</h1>
        <div className="cart-vacio">
          <p>Tu carrito está vacío</p>
          <Link to="/" className="btn-link">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-titulo">Carrito de Compras</h1>
      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateItemQuantity}
            />
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <p className="total-label">Total:</p>
            <p className="total-value">{formattedTotal}</p>
          </div>
          <div className="cart-acciones">
            <button
              type="button"
              onClick={clearCart}
              className="btn-limpiar-carrito"
            >
              Limpiar carrito
            </button>
            <Link to="/checkout" className="btn-checkout">
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
