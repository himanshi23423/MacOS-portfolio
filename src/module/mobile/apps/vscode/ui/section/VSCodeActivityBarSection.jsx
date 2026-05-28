import { Files, Search, GitBranch, Blocks, Terminal, Settings } from "lucide-react";

const VSCodeActivityBarSection = ({ activeSidebar, onSidebarChange, modifiedCount, onToggleTerminal }) => {
  const tabs = [
    { id: "explorer", icon: Files },
    { id: "search", icon: Search },
    { id: "git", icon: GitBranch },
    { id: "extensions", icon: Blocks },
  ];

  return (
    <div className="w-12 bg-[#ececec] border-r border-zinc-200 flex flex-col justify-between items-center py-2 shrink-0">
      <div className="flex flex-col gap-5 items-center w-full">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSidebarChange(id)}
            className={`p-2 transition-colors relative ${activeSidebar === id ? "text-blue-600 border-l-2 border-blue-500 bg-white" : "text-zinc-500 hover:text-zinc-900"}`}
          >
            <Icon size={20} />
            {id === "git" && modifiedCount > 0 && (
              <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                {modifiedCount}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <button onClick={onToggleTerminal} className="p-2 text-zinc-500 hover:text-zinc-900">
          <Terminal size={20} />
        </button>
        <button className="p-2 text-zinc-500 hover:text-zinc-900">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default VSCodeActivityBarSection;
