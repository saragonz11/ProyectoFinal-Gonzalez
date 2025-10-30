import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [count, setCount] = useState(1);

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

  if (loading) return <div className="item-detail-container">Cargando...</div>;
  if (error) return <div className="item-detail-container">Ocurrió un error: {error}</div>;
  if (!product) return null;

  return (
    <div className="item-detail-container">
      <div className="detalle">
        <img src={product.image} alt={product.title} className="detalle-imagen" />
        <div className="detalle-info">
          <h2>{product.title}</h2>
          <p className="detalle-categoria">{product.category}</p>
          <p className="detalle-descripcion">{product.description}</p>
          <p className="detalle-precio">${product.price}</p>

          <div className="item-count">
            <button
              aria-label="decrement"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
            >
              -
            </button>
            <span className="item-count-valor">{count}</span>
            <button aria-label="increment" onClick={() => setCount((c) => c + 1)}>
              +
            </button>
            <button className="btn-agregar" onClick={() => {}}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
