import React from "react";

const ItemCount = ({ value = 1, min = 1, max = 10, onChange, onAdd }) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleAdd = () => {
    onAdd(value);
  };

  return (
    <div className="item-count">
      <button
        type="button"
        aria-label="decrementar cantidad"
        onClick={handleDecrement}
        disabled={value <= min}
        className="btn-count"
      >
        -
      </button>
      <span className="item-count-valor" aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        type="button"
        aria-label="incrementar cantidad"
        onClick={handleIncrement}
        disabled={value >= max}
        className="btn-count"
      >
        +
      </button>
      <button
        type="button"
        className="btn-agregar"
        onClick={handleAdd}
        aria-label={`Agregar ${value} unidad${
          value !== 1 ? "es" : ""
        } al carrito`}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
