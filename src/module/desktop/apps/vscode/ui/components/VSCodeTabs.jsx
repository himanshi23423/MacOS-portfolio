import { X } from "lucide-react";
import VSCodeFileIcon from "./VSCodeFileIcon";

const VSCodeTabs = ({ openTabs, activeFile, onSelectFile, onCloseTab }) => {
  return (
    <div className="h-[35px] bg-[#f3f3f3] flex items-center border-b border-[#e5e5e5] overflow-x-auto shrink-0 select-none">
      {openTabs.map((tab) => {
        const isActive = activeFile === tab;
        const fileName = tab.split("/").pop();
        return (
          <div
            key={tab}
            onClick={() => onSelectFile(tab)}
            className={`h-full flex items-center gap-2 px-3 border-r border-[#e5e5e5] cursor-pointer text-[12px] relative shrink-0 transition-all group ${
              isActive
                ? "bg-white text-[#333333] font-semibold"
                : "bg-[#ececec] text-[#616161] hover:bg-[#e8e8e8] hover:text-[#333333]"
            }`}
          >
            {isActive && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#007acc]" />}
            <VSCodeFileIcon filename={fileName} size={14} />
            <span>{fileName}</span>
            <button
              onClick={(e) => onCloseTab(tab, e)}
              className={`p-0.5 rounded hover:bg-[#d5d5d5] text-[#616161] hover:text-[#333333] transition-colors ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VSCodeTabs;
