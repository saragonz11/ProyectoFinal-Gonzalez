import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import BarraNavegacion from "./components/BarraNavegacion";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="aplicacion">
        <BarraNavegacion />
        <Routes>
          <Route
            path="/"
            element={
              <ItemListContainer mensajeBienvenida="¡Bienvenidos a Mi Tienda!" />
            }
          />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 24 }}>404 - Página no encontrada</div>
            }
          />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
