import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <article className="card-producto">
      <Link to={`/item/${product.id}`} className="link-producto">
        <img
          src={product.image}
          alt={product.title}
          className="imagen-producto"
          loading="lazy"
        />
        <div className="info-producto">
          <h3 className="titulo-producto">{product.title}</h3>
          <p className="precio-producto">{formattedPrice}</p>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;

