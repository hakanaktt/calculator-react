// CalculatorButton.js
import React from "react";
import "../main.css";

function CalculatorButton({ label, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
}

export default CalculatorButton;
