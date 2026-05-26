import React, { useState } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";

const Calculator = () => {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setValue(null);
    setDisplayValue("0");
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplayValue("0");
  };

  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
    } else if (displayValue.indexOf(".") === -1) {
      setDisplayValue(displayValue + ".");
      setWaitingForOperand(false);
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      setValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue,
  };

  const clearText = displayValue !== "0" ? "C" : "AC";

  const btnStyle =
    "flex items-center justify-center text-2xl font-normal rounded-full transition-colors active:opacity-70 focus:outline-none";

  const getFontSize = (length) => {
    if (length <= 6) return "4rem";
    if (length <= 8) return "3rem";
    if (length <= 11) return "2.2rem";
    if (length <= 15) return "1.5rem";
    return "1.2rem";
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1c1c1c]/90 backdrop-blur-2xl rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none">
      <div
        id="window-header"
        className="shrink-0 pt-3 px-4 pb-0 flex items-center relative z-10"
      >
        <WindowControls target="calculator" />
      </div>

      <div className="flex-1 flex flex-col p-4 pt-2 relative">
        <div className="flex flex-col items-end justify-end h-24 mb-2 pr-2 w-full overflow-hidden">
          {value != null && operator && (
            <span className="text-white/50 text-xl font-light tracking-wider mb-1 whitespace-nowrap">
              {value} {operator.replace('*', '×').replace('/', '÷')}
            </span>
          )}
          <span
            className="text-white font-light tabular-nums tracking-tight whitespace-nowrap"
            style={{ fontSize: getFontSize(displayValue.length), transition: "font-size 0.1s" }}
          >
            {displayValue}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3 flex-1">
          {/* Row 1 */}
          <button
            className={`${btnStyle} bg-[#a5a5a5] text-black hover:bg-[#d4d4d2]`}
            onClick={() => (displayValue !== "0" ? clearDisplay() : clearAll())}
          >
            {clearText}
          </button>
          <button
            className={`${btnStyle} bg-[#a5a5a5] text-black hover:bg-[#d4d4d2]`}
            onClick={toggleSign}
          >
            ±
          </button>
          <button
            className={`${btnStyle} bg-[#a5a5a5] text-black hover:bg-[#d4d4d2]`}
            onClick={inputPercent}
          >
            %
          </button>
          <button
            className={`${btnStyle} bg-[#ff9f0a] text-white hover:bg-[#ffb03a] ${
              operator === "/" ? "bg-[#ffb03a] ring-2 ring-white" : ""
            }`}
            onClick={() => performOperation("/")}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(7)}
          >
            7
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(8)}
          >
            8
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(9)}
          >
            9
          </button>
          <button
            className={`${btnStyle} bg-[#ff9f0a] text-white hover:bg-[#ffb03a] ${
              operator === "*" ? "bg-[#ffb03a] ring-2 ring-white" : ""
            }`}
            onClick={() => performOperation("*")}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(4)}
          >
            4
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(5)}
          >
            5
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(6)}
          >
            6
          </button>
          <button
            className={`${btnStyle} bg-[#ff9f0a] text-white hover:bg-[#ffb03a] ${
              operator === "-" ? "bg-[#ffb03a] ring-2 ring-white" : ""
            }`}
            onClick={() => performOperation("-")}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(1)}
          >
            1
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(2)}
          >
            2
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={() => inputDigit(3)}
          >
            3
          </button>
          <button
            className={`${btnStyle} bg-[#ff9f0a] text-white hover:bg-[#ffb03a] ${
              operator === "+" ? "bg-[#ffb03a] ring-2 ring-white" : ""
            }`}
            onClick={() => performOperation("+")}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] col-span-2 !justify-start pl-8`}
            onClick={() => inputDigit(0)}
          >
            0
          </button>
          <button
            className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050]`}
            onClick={inputDot}
          >
            .
          </button>
          <button
            className={`${btnStyle} bg-[#ff9f0a] text-white hover:bg-[#ffb03a]`}
            onClick={() => performOperation("=")}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

const CalculatorWindow = windowWrapper(Calculator, "calculator");
export default CalculatorWindow;
