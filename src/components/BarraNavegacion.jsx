import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import WidgetCarrito from "./WidgetCarrito";
const API_BASE = "https://fakestoreapi.com";

const BarraNavegacion = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/products/categories`)
      .then((r) => {
        if (!r.ok) throw new Error("Error obteniendo categorías");
        return r.json();
      })
      .then((cats) => {
        if (!cancelled) setCategories(cats);
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
  }, []);

  const getNavLinkClassName = ({ isActive }) => {
    return isActive ? "enlace-nav active" : "enlace-nav";
  };

  return (
    <nav className="barra-navegacion" aria-busy={loading}>
      <div className="marca-tienda">
        <h2>Mi Tienda</h2>
      </div>
      <div className="enlaces-navegacion">
        <NavLink to="/" className={getNavLinkClassName}>
          Inicio
        </NavLink>
        {loading ? (
          <span className="enlace-nav" aria-busy="true">
            Cargando categorías...
          </span>
        ) : error ? (
          <span className="enlace-nav estado-error-nav">
            Error cargando categorías
          </span>
        ) : (
          categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/category/${cat}`}
              className={getNavLinkClassName}
            >
              {cat}
            </NavLink>
          ))
        )}
      </div>
      <div className="carrito-navegacion">
        <WidgetCarrito />
      </div>
    </nav>
  );
};

export default BarraNavegacion;
