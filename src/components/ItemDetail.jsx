import React from "react";
import ItemCount from "./ItemCount";

/**
 * Componente presentacional que muestra el detalle de un producto
 * @param {Object} props
 * @param {Object} props.product - Producto a mostrar
 * @param {number} props.quantity - Cantidad seleccionada
 * @param {Function} props.onQuantityChange - Callback cuando cambia la cantidad
 * @param {Function} props.onAddToCart - Callback cuando se agrega al carrito
 * @param {boolean} props.showItemCount - Si se debe mostrar el ItemCount
 */
const ItemDetail = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  showItemCount = true,
}) => {
  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const stock = product.stock || 10; // Stock por defecto si no existe

  return (
    <div className="detalle">
      <div className="detalle-imagen-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="detalle-imagen"
        />
      </div>
      <div className="detalle-info">
        <h2 className="detalle-titulo">{product.title}</h2>
        <p className="detalle-categoria">{product.category}</p>
        <div className="detalle-descripcion-wrapper">
          <p className="detalle-descripcion">{product.description}</p>
        </div>
        <div className="detalle-precio-wrapper">
          <p className="detalle-precio">{formattedPrice}</p>
        </div>
        {stock <= 0 ? (
          <div className="mensaje-sin-stock">
            <p>Producto sin stock</p>
          </div>
        ) : (
          showItemCount && (
            <div className="detalle-controls">
              <ItemCount
                value={quantity}
                min={1}
                max={stock}
                onChange={onQuantityChange}
                onAdd={onAddToCart}
              />
            </div>
          )
        )}
        {!showItemCount && (
          <div className="mensaje-agregado">
            <p>✓ Producto agregado al carrito</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
