import React from "react";

/**
 * Componente presentacional que muestra un item del carrito
 * @param {Object} props
 * @param {Object} props.item - Item del carrito
 * @param {Function} props.onRemove - Callback para eliminar el item
 * @param {Function} props.onUpdateQuantity - Callback para actualizar la cantidad
 */
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(item.price);

  const subtotal = item.price * item.quantity;
  const formattedSubtotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(subtotal);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-imagen">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-info">
        <h3 className="cart-item-titulo">{item.title}</h3>
        <p className="cart-item-precio-unitario">
          Precio unitario: {formattedPrice}
        </p>
      </div>
      <div className="cart-item-cantidad">
        <label htmlFor={`quantity-${item.id}`}>Cantidad:</label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="input-cantidad"
        />
      </div>
      <div className="cart-item-subtotal">
        <p className="subtotal-label">Subtotal:</p>
        <p className="subtotal-value">{formattedSubtotal}</p>
      </div>
      <div className="cart-item-acciones">
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="btn-eliminar"
          aria-label={`Eliminar ${item.title} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
