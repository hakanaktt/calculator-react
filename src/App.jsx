import React, { useState, useEffect } from "react";
import "./main.css";
import styles from "./main.css";
import * as math from "mathjs";
import CalculatorScreen from "./components/CalculatorScreen";
import CalculatorButton from "./components/CalculatorButton";

function App() {
  const [expression, setExpression] = useState("0");
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (!isNaN(Number(key))) {
        key === "0" ? handleZeroDigit() : handleNumberOrOperator(Number(key));
      } else if (operatorSymbols.includes(key)) {
        handleNumberOrOperator(getOperatorDigit(key));
      } else if (key === "." || key === ",") {
        handleDecimal();
      } else if (key === "Enter" || key === "=") {
        handleEquals();
      } else if (key === "Escape" || key === "Delete") {
        handleClear();
      } else if (key === "Backspace") {
        handleBackspace();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const operatorSymbols = ["+", "-", "/", "*"];

  const handleZeroDigit = () => {
    if (expression === "0") {
      setExpression("0");
    } else {
      setExpression((prevExpression) => prevExpression + "0");
    }
  };

  const handleClear = () => {
    setExpression("0");
  };

  const handleBackspace = () => {
    setExpression((prevExpression) => prevExpression.slice(0, -1));
  };

  const logCurrentValue = () => {
    console.log(expression, typeof expression);
  };

  const handleNegative = () => {
    const lastChar = expression.slice(-1);
    if (lastChar === ")") return;
    if (isLastCharNumber()) {
      setExpression("-(" + expression + ")");
    } else {
      alert("You can only add 12 numbers on the screen!");
    }
  };

  const handleDecimal = () => {
    if (isLastCharNumber()) {
      setExpression((prevExpression) => prevExpression + ".");
    }
  };

  const handleEquals = () => {
    try {
      const result = math.evaluate(expression);
      setExpression(result.toString());
    } catch (error) {
      alert("Invalid Expression. Nice Try!");
    }
  };

  const handleNumberOrOperator = (digit) => {
    if (expression.length >= 12) return;

    const lastChar = expression.slice(-1);
    const isLastCharOperator = isOperatorTest(lastChar);
    const isCurrentCharOperator = isOperator(digit);

    if (isLastCharOperator && isCurrentCharOperator) {
      setExpression(
        (prevExpression) =>
          prevExpression.slice(0, -1) + getOperatorSymbol(digit)
      );
    } else {
      if (isCurrentCharOperator) {
        if (isLastCharNumber()) {
          setExpression(
            (prevExpression) => prevExpression + getOperatorSymbol(digit)
          );
        }
      } else {
        if (expression === "0") {
          setExpression("");
        }
        setExpression((prevExpression) => prevExpression + digit);
      }
    }
  };

  const isOperatorTest = (operator) => {
    return operatorSymbols.includes(operator);
  };

  const isOperator = (digit) => {
    return digit >= 13 && digit <= 16;
  };

  const getOperatorSymbol = (digit) => {
    return operatorSymbols[digit - 13];
  };

  const isLastCharNumber = () => {
    return typeof Number(expression.slice(-1)) === "number";
  };

  const getOperatorDigit = (symbol) => {
    return operatorSymbols.indexOf(symbol) + 13;
  };

  return (
    <div className="container center">
      <div className="calculator-wrapper center">
        <CalculatorScreen expression={expression} />
        <div className="button-layer">
          <CalculatorButton label="C" onClick={handleClear} />
          <CalculatorButton label="CE" onClick={() => handleBackspace("CE")} />
          <CalculatorButton label="LOG" onClick={() => logCurrentValue()} />
          <CalculatorButton
            className={styles.trans}
            label="+"
            onClick={() => handleNumberOrOperator("+")}
          />
          <CalculatorButton
            label="1"
            onClick={() => handleNumberOrOperator(1)}
          />
          <CalculatorButton
            label="2"
            onClick={() => handleNumberOrOperator(2)}
          />
          <CalculatorButton
            label="3"
            onClick={() => handleNumberOrOperator(3)}
          />
          <CalculatorButton
            className="trans"
            label="-"
            onClick={() => handleNumberOrOperator("-")}
          />
          <CalculatorButton
            label="4"
            onClick={() => handleNumberOrOperator(4)}
          />
          <CalculatorButton
            label="5"
            onClick={() => handleNumberOrOperator(5)}
          />
          <CalculatorButton
            label="6"
            onClick={() => handleNumberOrOperator(6)}
          />
          <CalculatorButton
            className="trans"
            label="*"
            onClick={() => handleNumberOrOperator("*")}
          />
          <CalculatorButton
            label="7"
            onClick={() => handleNumberOrOperator(7)}
          />
          <CalculatorButton
            label="8"
            onClick={() => handleNumberOrOperator(8)}
          />
          <CalculatorButton
            label="9"
            onClick={() => handleNumberOrOperator(9)}
          />
          <CalculatorButton
            className="trans"
            label="/"
            onClick={() => handleNumberOrOperator("/")}
          />
          <CalculatorButton label="." onClick={() => handleDecimal()} />
          <CalculatorButton label="0" onClick={() => handleZeroDigit()} />
          <CalculatorButton label="+/-" onClick={() => handleNegative()} />
          <CalculatorButton label="=" onClick={() => handleEquals()} />
        </div>
      </div>
    </div>
  );
}

export default App;
