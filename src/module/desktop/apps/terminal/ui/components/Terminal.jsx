import React, { useState, useEffect, useRef } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import TerminalAboutModal from "./TerminalAboutModal";

const Terminal = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.terminal?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("terminal", { ...windows.terminal.data, openAbout: false });
    }
  }, [windows.terminal?.data?.openAbout, windows.terminal?.data, setWindowData]);

  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);
  const commandRef = useRef("");

  return (
    <>
      <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden shadow-xl border border-black/10">
        <TerminalOutput />
        <TerminalInput
          terminalRef={terminalRef}
          xtermRef={xtermRef}
          fitAddonRef={fitAddonRef}
          commandRef={commandRef}
        />
      </div>
      <TerminalAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");
export default TerminalWindow;
