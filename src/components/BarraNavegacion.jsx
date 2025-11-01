import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import WidgetCarrito from "./WidgetCarrito";
import { getCategories } from "../services/fakestore";

const BarraNavegacion = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCategories()
      .then((cats) => {
        if (!cancelled) setCategories(cats);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <nav className="barra-navegacion">
      <div className="marca-tienda">
        <h2>Mi Tienda</h2>
      </div>
      <div className="enlaces-navegacion">
        <NavLink to="/" className="enlace-nav">
          Inicio
        </NavLink>
        {loading ? (
          <span className="enlace-nav">Cargando categorías...</span>
        ) : (
          categories.map((cat) => (
            <NavLink key={cat} to={`/category/${cat}`} className="enlace-nav">
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
