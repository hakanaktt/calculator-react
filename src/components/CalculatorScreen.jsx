// CalculatorScreen.js
import React from "react";

function CalculatorScreen({ expression }) {
  return (
    <div className="screen center">
      <input
        className="calculation"
        type="text"
        maxLength={12}
        readOnly
        value={expression}
      />
    </div>
  );
}

export default CalculatorScreen;
