import { Files, Search, GitBranch, Blocks, Terminal, Settings } from "lucide-react";

const VSCodeActivityBarSection = ({
  activeSidebar,
  onSidebarChange,
  modifiedCount,
  onToggleTerminal,
}) => {
  const tabs = [
    { id: "explorer", icon: Files },
    { id: "search", icon: Search },
    { id: "git", icon: GitBranch },
    { id: "extensions", icon: Blocks },
  ];

  return (
    <div className="w-12 bg-[#f3f3f3] border-r border-[#e5e5e5] flex flex-col justify-between items-center py-2 shrink-0">
      <div className="flex flex-col gap-5 items-center w-full">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSidebarChange(id)}
            className={`p-2 w-full flex justify-center transition-colors relative focus:outline-none ${
              activeSidebar === id
                ? "text-[#007acc] border-l-2 border-[#007acc] bg-white"
                : "text-[#616161] hover:text-[#333333]"
            }`}
          >
            <Icon size={20} />
            {id === "git" && modifiedCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#007acc] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                {modifiedCount}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onToggleTerminal}
          className="p-2 text-[#616161] hover:text-[#333333] focus:outline-none"
        >
          <Terminal size={20} />
        </button>
        <button className="p-2 text-[#616161] hover:text-[#333333] focus:outline-none">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default VSCodeActivityBarSection;
