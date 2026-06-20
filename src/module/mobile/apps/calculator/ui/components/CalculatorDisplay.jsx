const getFontSize = (length) => {
  if (length <= 6) return "4rem";
  if (length <= 8) return "3rem";
  if (length <= 11) return "2.2rem";
  if (length <= 15) return "1.5rem";
  return "1.2rem";
};

const CalculatorDisplay = ({ value, operator, displayValue }) => (
  <div className="flex flex-col items-end justify-end h-24 mb-2 pr-2 w-full overflow-hidden">
    {value != null && operator && (
      <span className="text-white/50 text-xl font-light tracking-wider mb-1 whitespace-nowrap">
        {value} {operator.replace("*", "×").replace("/", "÷")}
      </span>
    )}
    <span
      className="text-white font-light tabular-nums tracking-tight whitespace-nowrap"
      style={{ fontSize: getFontSize(displayValue.length), transition: "font-size 0.1s" }}
    >
      {displayValue}
    </span>
  </div>
);

export default CalculatorDisplay;
