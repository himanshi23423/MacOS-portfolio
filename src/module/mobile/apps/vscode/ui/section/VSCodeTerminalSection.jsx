import { Play, Terminal as TerminalIcon } from "lucide-react";

const VSCodeTerminalSection = ({
  isTerminalOpen, onToggleTerminal,
  terminalHistory, terminalInput, setTerminalInput,
  terminalBottomRef, runCommand,
}) => {
  if (!isTerminalOpen) return null;

  return (
    <div className="h-44 bg-zinc-50 border-t border-zinc-200 flex flex-col shrink-0 select-none">
      <div className="bg-[#f3f3f3] px-4 py-1.5 border-b border-zinc-200 flex items-center justify-between text-[11px] text-zinc-600">
        <div className="flex items-center gap-4 font-semibold">
          <span className="hover:text-zinc-800 cursor-pointer">Problems</span>
          <span className="hover:text-zinc-800 cursor-pointer">Output</span>
          <span className="hover:text-zinc-800 cursor-pointer">Debug Console</span>
          <span className="text-zinc-950 border-b-2 border-blue-600 pb-0.5 cursor-pointer font-bold">Terminal</span>
        </div>
        <div className="flex items-center gap-3">
          <Play size={12} className="text-green-600 cursor-pointer" />
          <button onClick={onToggleTerminal}>
            <TerminalIcon size={12} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] select-text">
        <div className="space-y-1">
          {terminalHistory.map((item, idx) => (
            <div key={idx} className={item.type === "input" ? "text-green-600 font-bold" : "text-zinc-700 leading-normal"}>
              {item.type === "input" ? `➜ /workspace $ ${item.text}` : item.text}
            </div>
          ))}
          <div ref={terminalBottomRef} />
        </div>
      </div>

      <div className="bg-[#f0f0f0] px-3 py-1 flex items-center gap-2 border-t border-zinc-200 shrink-0">
        <span className="text-green-600 font-bold font-mono text-xs">➜ /workspace $</span>
        <input
          type="text"
          value={terminalInput}
          onChange={(e) => setTerminalInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runCommand(terminalInput);
              setTerminalInput("");
            }
          }}
          placeholder="type 'help' for available workspace commands..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-800 text-xs font-mono select-text"
        />
      </div>
    </div>
  );
};

export default VSCodeTerminalSection;
