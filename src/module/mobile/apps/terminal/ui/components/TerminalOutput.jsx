import WindowControls from "#components/WindowControls";

const TerminalOutput = () => (
  <div id="window-header" className="shrink-0 bg-[#e8e8e8]/50 border-b border-black/10 px-4 py-3 flex items-center">
    <WindowControls target="terminal" />
    <h2 className="flex-1 text-center text-[13px] font-semibold text-gray-700">kuldeep — -zsh</h2>
  </div>
);

export default TerminalOutput;
