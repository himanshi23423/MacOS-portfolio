import { useState } from "react";
import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import useVSCode from "./useVSCode";
import VSCodeSection from "../section/VSCodeSection";

const VSCode = () => {
  const hook = useVSCode();
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  return (
    <div className="flex flex-col h-full w-full bg-white text-[#333333] font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80">
      <div
        id="window-header"
        className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-zinc-600 font-sans"
      >
        <div className="flex items-center gap-2">
          <WindowControls target="vscode" />
          <div className="flex items-center gap-3 pl-4 font-semibold select-none hidden md:flex">
            <span className="hover:text-zinc-900 cursor-pointer">File</span>
            <span className="hover:text-zinc-900 cursor-pointer">Edit</span>
            <span className="hover:text-zinc-900 cursor-pointer">Selection</span>
            <span className="hover:text-zinc-900 cursor-pointer">View</span>
            <span className="hover:text-zinc-900 cursor-pointer">Go</span>
          </div>
        </div>
        <div className="flex-1 text-center font-medium text-[11px] truncate px-4">
          {hook.activeFile} — macos-portfolio (Workspace)
        </div>
        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded font-bold">
            Local
          </span>
        </div>
      </div>

      <VSCodeSection
        {...hook}
        isTerminalOpen={isTerminalOpen}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />
    </div>
  );
};

const VSCodeWindow = windowWrapper(VSCode, "vscode");
export default VSCodeWindow;
