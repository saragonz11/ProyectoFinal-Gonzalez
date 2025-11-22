import React from "react";
import ProductCard from "./ProductCard";

/**
 * Componente presentacional que renderiza la lista de productos
 * @param {Object} props
 * @param {Array} props.products - Array de productos a mostrar
 */
const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="grid-productos">
        <p className="mensaje-vacio">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid-productos">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
