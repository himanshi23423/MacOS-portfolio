import { useRef, useEffect, useMemo } from "react";
import { FileText, ChevronRight } from "lucide-react";
import VSCodeFileIcon from "./VSCodeFileIcon";

// Breadcrumb bar showing the file path segments
const Breadcrumb = ({ activeFile }) => {
  if (!activeFile) return null;
  const segments = activeFile.split("/");
  return (
    <div className="h-[22px] bg-white border-b border-[#e5e5e5] flex items-center px-3 gap-0.5 shrink-0 text-[11px] text-[#616161] select-none overflow-x-auto">
      <VSCodeFileIcon filename={segments[segments.length - 1]} size={12} />
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-0.5 shrink-0">
          {i > 0 && <ChevronRight size={10} className="text-[#b0b0b0]" />}
          <span className={`hover:text-[#007acc] cursor-pointer transition-colors ${i === segments.length - 1 ? "text-[#333333] font-medium" : ""}`}>
            {seg}
          </span>
        </span>
      ))}
    </div>
  );
};

// Minimap component — renders a tiny scaled-down preview of the code
const Minimap = ({ content }) => {
  const lines = content.split("\n");
  const maxLines = 80;
  const displayLines = lines.slice(0, maxLines);

  return (
    <div className="w-[48px] bg-[#f8f8f8] border-l border-[#eeeeee] shrink-0 overflow-hidden select-none relative hidden md:block">
      <div className="py-1 px-1">
        {displayLines.map((line, i) => {
          const trimmed = line.replace(/\s+/g, " ").slice(0, 40);
          const width = Math.min(trimmed.length * 0.9, 44);
          return (
            <div
              key={i}
              className="h-[2px] mb-[1px] rounded-sm"
              style={{
                width: `${width}px`,
                backgroundColor: trimmed.trim() ? "#c0c0c0" : "transparent",
                opacity: trimmed.trim() ? 0.5 : 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const VSCodeEditor = ({ files, activeFile, openTabs, modifiedFiles, onContentChange }) => {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Sync scroll between textarea and line numbers column
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, [activeFile]);

  if (openTabs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-[#a0a0a0] text-center bg-white select-none">
        <FileText size={48} className="text-[#e5e5e5] mb-3 animate-pulse" />
        <h4 className="text-sm font-bold text-[#333333]">No Editors Open</h4>
        <p className="text-xs text-[#616161] mt-1 max-w-xs leading-relaxed">
          Select a file from the explorer to start editing.
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 text-[11px] text-[#a0a0a0]">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-[#f3f3f3] border border-[#e5e5e5] rounded text-[10px] font-mono">⌘</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 bg-[#f3f3f3] border border-[#e5e5e5] rounded text-[10px] font-mono">P</kbd>
            <span className="ml-1">Quick Open</span>
          </div>
        </div>
      </div>
    );
  }

  const fileContent = files[activeFile] || "";
  const lines = fileContent.split("\n");

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Breadcrumb */}
      <Breadcrumb activeFile={activeFile} />

      <div className="flex-1 min-h-0 flex relative bg-white">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="w-[46px] text-right pr-3 text-[#b0b0b0] font-mono text-[12px] bg-white py-3 select-none overflow-hidden shrink-0"
          style={{ lineHeight: "20px" }}
        >
          {lines.map((_, idx) => (
            <div key={idx} className="h-5 leading-5">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={fileContent}
          onChange={(e) => onContentChange(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 h-full bg-white text-[#333333] py-3 px-1 border-none outline-none resize-none font-mono text-[12px] select-text overflow-y-auto selection:bg-[#add6ff] leading-5"
          style={{ whiteSpace: "pre", lineHeight: "20px" }}
          spellCheck="false"
        />

        {/* Minimap */}
        <Minimap content={fileContent} />

        {/* Unsaved changes badge */}
        {modifiedFiles[activeFile] && (
          <div className="absolute right-14 top-10 flex items-center gap-1.5 bg-[#fff6e6] border border-[#ffe6ba] px-2.5 py-1 rounded-md text-[10px] text-[#8f6d00] font-bold pointer-events-none animate-pulse shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8f6d00]" />
            <span>Modified</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VSCodeEditor;
