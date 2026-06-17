import { CheckCircle, Info } from "lucide-react";

const VSCodeStatusBarSection = ({ _activeFile, language, lineCount, isNarrow }) => (
  <div className="bg-[#007acc] text-white px-3 py-1 flex justify-between items-center text-[10px] shrink-0 font-sans select-none">
    <div className="flex items-center gap-3">
      <span className="bg-[#0062b3] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
        <CheckCircle size={10} /> main
      </span>
      <span className="flex items-center gap-1">
        <Info size={10} /> 0 Problems
      </span>
    </div>
    <div className="flex items-center gap-4">
      <span>Ln {lineCount}</span>
      {!isNarrow && (
        <>
          <span>LF</span>
          <span>UTF-8</span>
        </>
      )}
      <span>{language}</span>
    </div>
  </div>
);

export default VSCodeStatusBarSection;
