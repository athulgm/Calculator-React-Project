import React, { useState } from "react";
import './calculator.css'

const Calculator = () => {
  const [result, setResult] = useState("");

  const calculate = () => {
    const expression = result;
    // Define a stack for holding the operands
    let operands = [];
    // Define a stack for holding the operators
    let operators = [];
    // Define a variable for holding the current operand
    let currentOperand = "";  
    // Iterate through each character in the expression
    for (let i = 0; i < expression.length; i++) {
      let char = expression[i];
      // Check if the character is a digit or dot
      if (!isNaN(char) || char === '.') {
        currentOperand += char;
      } else {
        // Check if the currentOperand has more than one dot
        if (currentOperand.split(".").length > 2) {
          setResult("error: invalid number");
          return;
        }
        operands.push(parseFloat(currentOperand));
        currentOperand = "";
        operators.push(char);
      }
    }
    // Push the final operand onto the stack
    // Check if the final operand has more than one dot
    if (currentOperand.split(".").length > 2) {
      setResult("error: invalid number");
      return;
    }
    operands.push(parseFloat(currentOperand));
    // Evaluate the expression
    for (let i = 0; i < operators.length; i++) {
        let operator = operators[i];
      // Check if there are enough operands for the given operator
      if (operands.length < 2) {
        setResult("error: invalid expression");
        return;
      }
      let secondOperand = operands.splice(operands.length - 1, 1)[0];
      let firstOperand = operands.splice(operands.length - 1, 1)[0];
      let result = 0; 
      switch (operator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "*":
          result = firstOperand * secondOperand;
          break;
        case "/":
          // Check if dividing by zero
          if (secondOperand === 0) {
            setResult("error: division by zero");
            return;
          }
          result = firstOperand / secondOperand;
          break;
        default:
          setResult("error: invalid operator");
          return;
      }
      operands.push(result);
    }
    setResult(operands[0].toString());
  };
  const reset = () => {
    setResult("");
  };
  const backspace = () => {
    setResult(result.slice(0, -1));
  };
  const handleClick = (e) => {
    setResult(result + e.target.value);
  };
  const handlePercent = () => {
  setResult(`${parseFloat(result) / 100}`);
};
  const addDot = () => {
    setResult(result + ".");
  };
  return (
    <div className="main-container">
    <div className="calculator-container">
      <div className="result-display">{result}</div>
      <div className="c-name">Calculator</div>
      <div className="buttons-container">
      <div className="btn-row">
        <button className="button arrow operator-button" value="C" onClick={reset}>AC</button>
        <button className="button operator-button" value="%" onClick={handlePercent}>%</button>
        <button className="button operator-button" value="<" onClick={backspace}>&larr;</button>  
      </div>
      <div className="btn-row">
        <button className="button" value="9" onClick={handleClick}>9</button>
        <button className="button" value="8" onClick={handleClick}>8</button>
        <button className="button" value="7" onClick={handleClick}>7</button>
        <button className="button operator" value="+" onClick={handleClick}>+</button>
      </div>
      <div className="btn-row">
        <button className="button" value="6" onClick={handleClick}>6</button>
        <button className="button" value="5" onClick={handleClick}>5</button>
        <button className="button" value="4" onClick={handleClick}>4</button>
        <button className="button operator" value="-" onClick={handleClick}>-</button>
      </div>
       <div className="btn-row">
        <button className="button" value="3" onClick={handleClick}>3</button>
        <button className="button" value="2" onClick={handleClick}>2</button>
        <button className="button" value="1" onClick={handleClick}>1</button>
        <button className="button operator" value="*" onClick={handleClick}>x</button>
       </div>
      <div className="btn-row">
        <button className="button" onClick={addDot}>.</button>
        <button className="button" value="0" onClick={handleClick}>0</button>
        <button className="button eresult" value="=" onClick={calculate}>=</button>
        <button className="button operator" value="/" onClick={handleClick}>÷</button>
      </div>
      </div>
    </div>
</div>
  );
};

export default Calculator;
