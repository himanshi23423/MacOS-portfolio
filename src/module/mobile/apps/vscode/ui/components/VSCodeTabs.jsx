import { FileCode, X } from "lucide-react";

const VSCodeTabs = ({ openTabs, activeFile, onSelectFile, onCloseTab }) => {
  return (
    <div className="h-9 bg-[#ececec] flex items-center border-b border-zinc-200 overflow-x-auto shrink-0 select-none">
      {openTabs.map(tab => {
        const isActive = activeFile === tab;
        return (
          <div
            key={tab}
            onClick={() => onSelectFile(tab)}
            className={`h-full flex items-center gap-2 px-3 border-r border-zinc-200 cursor-pointer text-xs relative shrink-0 transition-all ${
              isActive ? "bg-white text-zinc-800 font-bold border-t-2 border-blue-500" : "bg-[#ececec] text-zinc-500 hover:bg-zinc-150 hover:text-zinc-800"
            }`}
          >
            <FileCode size={12} className={tab.endsWith(".json") ? "text-yellow-600" : tab.endsWith(".md") ? "text-sky-500" : "text-amber-500"} />
            <span className="font-semibold">{tab.split("/").pop()}</span>
            <button onClick={(e) => onCloseTab(tab, e)} className="p-0.5 rounded-full hover:bg-zinc-300 text-zinc-500 hover:text-zinc-800">
              <X size={10} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VSCodeTabs;
