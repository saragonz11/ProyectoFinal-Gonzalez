import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const WidgetCarrito = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  return (
    <Link to="/cart" className="widget-carrito-link">
      <div className="widget-carrito">
        <span className="icono-carrito">🛒</span>
        {totalQuantity > 0 && (
          <span className="contador-carrito" aria-live="polite">
            {totalQuantity}
          </span>
        )}
      </div>
    </Link>
  );
};

export default WidgetCarrito;
