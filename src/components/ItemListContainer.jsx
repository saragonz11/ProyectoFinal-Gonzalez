import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/fakestore";
import ProductGrid from "./ProductGrid";

const ItemListContainer = ({ mensajeBienvenida }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProducts(categoryId)
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
      <ProductGrid products={products} />
    </div>
  );
};

export default ItemListContainer;


