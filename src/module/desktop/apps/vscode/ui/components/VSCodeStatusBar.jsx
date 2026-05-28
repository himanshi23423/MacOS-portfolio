import { CheckCircle, Info } from "lucide-react";

const VSCodeStatusBar = () => {
  return (
    <div className="bg-[#005fb8] text-white px-3 py-1 flex justify-between items-center text-[10px] shrink-0 font-sans select-none">
      <div className="flex items-center gap-3">
        <span className="bg-[#004b93] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
          <CheckCircle size={10} /> main
        </span>
        <span className="flex items-center gap-1">
          <Info size={10} /> 0 Problems
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>LF</span>
        <span>UTF-8</span>
        <span>JavaScript React</span>
      </div>
    </div>
  );
};

export default VSCodeStatusBar;
