import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProducts,
  getProductsByCategory,
} from "../services/firestoreService";
import ItemList from "./ItemList";

const ItemListContainer = ({ mensajeBienvenida }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchData = categoryId
      ? getProductsByCategory(categoryId)
      : getProducts();

    fetchData
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
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
