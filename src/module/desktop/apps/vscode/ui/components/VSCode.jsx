import { useState, useEffect } from "react";
import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useVSCode from "./useVSCode";
import VSCodeSection from "../section/VSCodeSection";
import VSCodeAboutModal from "./VSCodeAboutModal";

const VSCode = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);
  const hook = useVSCode();
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  useEffect(() => {
    if (windows.vscode?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("vscode", { ...windows.vscode.data, openAbout: false });
    }
  }, [windows.vscode?.data?.openAbout, windows.vscode?.data, setWindowData]);

  return (
    <>
      <div className="flex flex-col h-full w-full bg-white text-[#333333] font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-[#cccccc]">
        <div
          id="window-header"
          className="shrink-0 bg-[#f3f3f3] border-b border-[#e5e5e5] px-4 py-2 flex items-center justify-between text-xs text-[#333333] font-sans"
        >
          <div className="flex items-center gap-2">
            <WindowControls target="vscode" />
            <div className="flex items-center gap-3 pl-4 font-semibold select-none hidden md:flex">
              <span className="hover:text-black cursor-pointer transition-colors">File</span>
              <span className="hover:text-black cursor-pointer transition-colors">Edit</span>
              <span className="hover:text-black cursor-pointer transition-colors">Selection</span>
              <span className="hover:text-black cursor-pointer transition-colors">View</span>
              <span className="hover:text-black cursor-pointer transition-colors">Go</span>
            </div>
          </div>
          <div className="flex-1 text-center font-medium text-[11px] truncate px-4">
            {hook.activeFile} — macos-portfolio (Workspace)
          </div>
          <div className="w-16 flex justify-end">
            <span className="text-[10px] bg-[#e5e5e5] text-[#333333] px-2 py-0.5 rounded font-bold border border-[#cccccc]">
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
      <VSCodeAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const VSCodeWindow = windowWrapper(VSCode, "vscode");
export default VSCodeWindow;

