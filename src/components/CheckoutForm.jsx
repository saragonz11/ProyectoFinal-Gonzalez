import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/firestoreService";

/**
 * Componente presentacional del formulario de checkout
 */
const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const total = getTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validar formulario
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Por favor completa todos los campos");
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Por favor ingresa un email válido");
      }

      // Preparar datos de la orden
      const orderData = {
        buyer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
      };

      // Crear orden en Firestore
      const id = await createOrder(orderData);
      setOrderId(id);

      // Limpiar carrito después de crear la orden
      clearCart();
    } catch (err) {
      setError(err.message || "Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  // Si la orden fue creada exitosamente, mostrar confirmación
  if (orderId) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <h2>¡Compra realizada con éxito!</h2>
          <p className="order-id">
            <strong>ID de tu orden:</strong> {orderId}
          </p>
          <p className="order-message">
            Te enviaremos un email de confirmación a{" "}
            <strong>{formData.email}</strong>
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-link"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
  }).format(total);

  return (
    <div className="checkout-container">
      <h1 className="checkout-titulo">Finalizar Compra</h1>
      <div className="checkout-content">
        <div className="checkout-form-wrapper">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="btn-submit"
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Resumen de compra</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.title}</span>
                <span>
                  {item.quantity} x{" "}
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total: {formattedTotal}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
