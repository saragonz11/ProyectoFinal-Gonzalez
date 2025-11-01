import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

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
        <div className="estado-carga">
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contenedor-lista-productos">
        <h1 className="mensaje-bienvenida">{titulo}</h1>
        <div className="estado-error">
          <p>Ocurrió un error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor-lista-productos">
      <h1 className="mensaje-bienvenida">{titulo}</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default ItemListContainer;
