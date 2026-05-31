import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import useCalculator from "./useCalculator";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeypad from "./CalculatorKeypad";

const Calculator = () => {
  const {
    value,
    displayValue,
    operator,
    clearAll,
    clearDisplay,
    toggleSign,
    inputPercent,
    inputDigit,
    inputDot,
    performOperation,
  } = useCalculator();

  return (
    <div className="flex flex-col h-full w-full bg-[#1c1c1c]/90 backdrop-blur-2xl rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none">
      <div id="window-header" className="shrink-0 pt-3 px-4 pb-2 flex items-center relative z-10">
        <WindowControls target="calculator" />
      </div>
      <div className="flex-1 flex flex-col p-4 pt-2 relative">
        <CalculatorDisplay value={value} operator={operator} displayValue={displayValue} />
        <CalculatorKeypad
          displayValue={displayValue}
          operator={operator}
          clearAll={clearAll}
          clearDisplay={clearDisplay}
          toggleSign={toggleSign}
          inputPercent={inputPercent}
          inputDigit={inputDigit}
          inputDot={inputDot}
          performOperation={performOperation}
        />
      </div>
    </div>
  );
};

const CalculatorWindow = windowWrapper(Calculator, "calculator");
export default CalculatorWindow;
