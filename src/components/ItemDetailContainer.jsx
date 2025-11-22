import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/firestoreService";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addItem, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setItemAdded(false);

    getProductById(id)
      .then((p) => {
        if (!cancelled) {
          setProduct(p);
          // Verificar si el producto ya está en el carrito
          setItemAdded(isInCart(p.id));
        }
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
  }, [id, isInCart]);

  const handleQuantityChange = (newValue) => {
    setQuantity(newValue);
  };

  const handleAddToCart = (qty) => {
    if (product) {
      addItem(product, qty);
      setItemAdded(true);
    }
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

  return (
    <div className="item-detail-container">
      <ItemDetail
        product={product}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
        showItemCount={!itemAdded}
      />
    </div>
  );
};

export default ItemDetailContainer;
