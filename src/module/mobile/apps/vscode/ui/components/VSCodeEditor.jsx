import { FileText } from "lucide-react";

const VSCodeEditor = ({ files, activeFile, openTabs, modifiedFiles, onContentChange }) => {
  if (openTabs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-zinc-500 text-center select-none">
        <FileText size={48} className="text-zinc-400 mb-3 animate-pulse" />
        <h4 className="text-sm font-bold text-zinc-400">No Editors Open</h4>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">
          Select a file from the explorer list on the left side panel to view or edit.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex relative">
      <div className="flex-1 flex font-mono text-xs">
        <textarea
          value={files[activeFile] || ""}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full bg-white text-zinc-800 p-4 border-none outline-none resize-none font-mono text-xs leading-relaxed select-text"
          style={{ whiteSpace: "pre", overflowY: "auto" }}
          spellCheck="false"
        />
        {modifiedFiles[activeFile] && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1.5 rounded-md text-[10px] text-amber-600 font-bold pointer-events-none animate-pulse">
            <span>Unsaved Changes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VSCodeEditor;
