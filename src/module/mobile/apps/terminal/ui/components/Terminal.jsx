import { useRef } from "react";
import windowWrapper from "@hoc/windowWrapper";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";

const Terminal = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);
  const commandRef = useRef("");

  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden shadow-xl border border-black/10">
      <TerminalOutput />
      <TerminalInput
        terminalRef={terminalRef}
        xtermRef={xtermRef}
        fitAddonRef={fitAddonRef}
        commandRef={commandRef}
      />
    </div>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");
export default TerminalWindow;
