import React from "react";

const btnStyle =
  "w-full aspect-square rounded-full flex items-center justify-center text-[28px] font-normal transition-all active:brightness-125 active:scale-95 focus:outline-none select-none";

const CalculatorKeypad = ({
  displayValue,
  operator,
  clearAll,
  clearDisplay,
  toggleSign,
  inputPercent,
  inputDigit,
  inputDot,
  performOperation,
}) => {
  const clearText = displayValue !== "0" ? "C" : "AC";

  // Helper to determine active operator highlight class (inverted colors in iOS 18)
  const getOperatorClass = (op) => {
    const isActive = operator === op;
    return isActive
      ? "bg-white text-[#ff9f0a] scale-102 shadow-sm font-semibold"
      : "bg-[#ff9f0a] text-white hover:bg-[#ffb03a] active:bg-[#ffc266]";
  };

  return (
    <div className="grid grid-cols-4 gap-3 w-full pb-4">
      {/* Row 1 */}
      <button
        className={`${btnStyle} bg-[#a5a5a5] text-black hover:bg-[#d4d4d2] active:bg-[#e5e5e5]`}
        onClick={() => (displayValue !== "0" ? clearDisplay() : clearAll())}
      >
        {clearText}
      </button>
      <button
        className={`${btnStyle} bg-[#a5a5a5] text-black hover:bg-[#d4d4d2] active:bg-[#e5e5e5]`}
        onClick={toggleSign}
      >
        ±
      </button>
      <button
        className={`${btnStyle} bg-[#a5a5a5] text-black hover:bg-[#d4d4d2] active:bg-[#e5e5e5]`}
        onClick={inputPercent}
      >
        %
      </button>
      <button
        className={`${btnStyle} ${getOperatorClass("/")}`}
        onClick={() => performOperation("/")}
      >
        ÷
      </button>

      {/* Row 2 */}
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(7)}
      >
        7
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(8)}
      >
        8
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(9)}
      >
        9
      </button>
      <button
        className={`${btnStyle} ${getOperatorClass("*")}`}
        onClick={() => performOperation("*")}
      >
        ×
      </button>

      {/* Row 3 */}
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(4)}
      >
        4
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(5)}
      >
        5
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(6)}
      >
        6
      </button>
      <button
        className={`${btnStyle} ${getOperatorClass("-")}`}
        onClick={() => performOperation("-")}
      >
        −
      </button>

      {/* Row 4 */}
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(1)}
      >
        1
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(2)}
      >
        2
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={() => inputDigit(3)}
      >
        3
      </button>
      <button
        className={`${btnStyle} ${getOperatorClass("+")}`}
        onClick={() => performOperation("+")}
      >
        +
      </button>

      {/* Row 5 */}
      <button
        className="col-span-2 w-full aspect-[2.1/1] rounded-full bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373] flex items-center justify-start pl-[12%] text-[28px] font-normal transition-all active:scale-95 focus:outline-none select-none"
        onClick={() => inputDigit(0)}
      >
        0
      </button>
      <button
        className={`${btnStyle} bg-[#333333] text-white hover:bg-[#505050] active:bg-[#737373]`}
        onClick={inputDot}
      >
        .
      </button>
      <button
        className={`${btnStyle} bg-[#ff9f0a] text-white hover:bg-[#ffb03a] active:bg-[#ffc266]`}
        onClick={() => performOperation("=")}
      >
        =
      </button>
    </div>
  );
};

export default CalculatorKeypad;
