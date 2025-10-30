import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE = "https://fakestoreapi.com";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchProducts(categoryId) {
  const endpoint = categoryId
    ? `${API_BASE}/products/category/${encodeURIComponent(categoryId)}`
    : `${API_BASE}/products`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Error obteniendo productos");
  }
  const data = await res.json();
  await delay(500);
  return data;
}

const ItemListContainer = ({ mensajeBienvenida }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProducts(categoryId)
      .then((items) => {
        if (!cancelled) setProducts(items);
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
  }, [categoryId]);

  const titulo = useMemo(() => {
    if (categoryId) return `Categoría: ${categoryId}`;
    return mensajeBienvenida || "Catálogo de productos";
  }, [categoryId, mensajeBienvenida]);

  if (loading) {
    return (
      <div className="contenedor-lista-productos">
        <h1 className="mensaje-bienvenida">{titulo}</h1>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contenedor-lista-productos">
        <h1 className="mensaje-bienvenida">{titulo}</h1>
        <p>Ocurrió un error: {error}</p>
      </div>
    );
  }

  return (
    <div className="contenedor-lista-productos">
      <h1 className="mensaje-bienvenida">{titulo}</h1>
      <div className="grid-productos">
        {products.map((product) => (
          <article key={product.id} className="card-producto">
            <Link to={`/item/${product.id}`} className="link-producto">
              <img
                src={product.image}
                alt={product.title}
                className="imagen-producto"
                loading="lazy"
              />
              <div className="info-producto">
                <h3 className="titulo-producto">{product.title}</h3>
                <p className="precio-producto">${product.price}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;


