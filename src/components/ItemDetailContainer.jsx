import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "./ItemCount";

const API_BASE = "https://fakestoreapi.com";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Error obteniendo producto");
  const data = await res.json();
  await delay(400);
  return data;
}

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((p) => {
        if (!cancelled) setProduct(p);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleQuantityChange = (newValue) => {
    setQuantity(newValue);
  };

  const handleAddToCart = (qty) => {
    console.log({ id: product.id, qty });
  };

  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="estado-carga">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-detail-container">
        <div className="estado-error">
          <p>Ocurrió un error: {error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="item-detail-container">
      <div className="detalle">
        <img
          src={product.image}
          alt={product.title}
          className="detalle-imagen"
        />
        <div className="detalle-info">
          <h2>{product.title}</h2>
          <p className="detalle-categoria">{product.category}</p>
          <p className="detalle-descripcion">{product.description}</p>
          <p className="detalle-precio">{formattedPrice}</p>

          <ItemCount
            value={quantity}
            min={1}
            max={10}
            onChange={handleQuantityChange}
            onAdd={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
