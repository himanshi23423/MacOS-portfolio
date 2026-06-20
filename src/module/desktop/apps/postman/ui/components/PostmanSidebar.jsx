import { Plus, Folder, FolderOpen, ChevronRight, ChevronDown, Layers, History } from "lucide-react";
import MOCK_COLLECTIONS from "../../data/postmanData";

const getMethodColor = (m) => {
  switch (m) {
    case "GET":
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "POST":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "PUT":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "DELETE":
      return "text-rose-600 bg-rose-50 border-rose-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const PostmanSidebar = ({
  expandedFolders,
  setExpandedFolders,
  loadRequest,
  url,
  method,
  sidebarTab,
  setSidebarTab,
  history,
  isSidebarOpen,
  isNarrow,
  onToggleSidebar,
}) => {
  const handleRequestClick = (req) => {
    loadRequest(req);
    if (isNarrow && onToggleSidebar) {
      onToggleSidebar(false);
    }
  };

  return (
    <div
      className={`transition-all duration-300 h-full z-20 shrink-0 bg-[#f8f9fa] border-r border-zinc-200 flex flex-col min-w-0 font-sans select-none ${
        isNarrow ? "absolute bg-[#f8f9fa]/95 shadow-lg" : "relative"
      } ${
        isNarrow && !isSidebarOpen
          ? "-translate-x-full w-0 overflow-hidden opacity-0 pointer-events-none"
          : "translate-x-0 w-56"
      }`}
    >
      {/* Tab switches */}
      <div className="flex border-b border-zinc-200 text-xs text-gray-500 font-semibold shrink-0">
        <button
          onClick={() => setSidebarTab("collections")}
          className={`flex-1 py-2 text-center border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            sidebarTab === "collections"
              ? "border-orange-500 text-orange-600 bg-white"
              : "border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          <Layers size={11} />
          Collections
        </button>
        <button
          onClick={() => setSidebarTab("history")}
          className={`flex-1 py-2 text-center border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            sidebarTab === "history"
              ? "border-orange-500 text-orange-600 bg-white"
              : "border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          <History size={11} />
          History
        </button>
      </div>

      {sidebarTab === "collections" ? (
        <>
          <div className="p-2.5 text-[9px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between border-b border-zinc-100 shrink-0">
            <span>Collections List</span>
            <Plus size={13} className="hover:text-gray-700 cursor-pointer" />
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {MOCK_COLLECTIONS.map((folder) => {
              const isExpanded = expandedFolders[folder.name];
              return (
                <div key={folder.name} className="space-y-0.5">
                  <div
                    onClick={() =>
                      setExpandedFolders((p) => ({ ...p, [folder.name]: !p[folder.name] }))
                    }
                    className="flex items-center gap-1.5 py-1 px-2 hover:bg-gray-200/60 rounded cursor-pointer text-xs font-semibold text-gray-700"
                  >
                    {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    {isExpanded ? (
                      <FolderOpen size={13} className="text-amber-500" />
                    ) : (
                      <Folder size={13} className="text-amber-500" />
                    )}
                    <span className="truncate">{folder.name}</span>
                  </div>
                  {isExpanded && (
                    <div className="pl-3 border-l border-zinc-200/70 ml-3.5 space-y-0.5">
                      {folder.requests.map((req) => {
                        const isActive =
                          url.includes(req.url.replace("https://api.dev", "")) &&
                          method === req.method;
                        return (
                          <div
                            key={req.id}
                            onClick={() => handleRequestClick(req)}
                            className={`flex items-center gap-1.5 py-1 px-2 hover:bg-gray-200/60 rounded cursor-pointer text-[11px] font-medium transition-colors ${
                              isActive
                                ? "bg-gray-200/80 text-gray-900 border-r-2 border-orange-500"
                                : "text-gray-600"
                            }`}
                          >
                            <span
                              className={`text-[8px] font-bold px-1.5 py-0.5 rounded border scale-95 shrink-0 ${getMethodColor(req.method)}`}
                            >
                              {req.method}
                            </span>
                            <span className="truncate">{req.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="p-2.5 text-[9px] font-bold uppercase tracking-wider text-gray-400 border-b border-zinc-100 shrink-0">
            Recent Requests
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {history.length > 0 ? (
              history.map((h, index) => (
                <div
                  key={index}
                  onClick={() => handleRequestClick({ method: h.method, url: h.url, body: "" })}
                  className="flex flex-col gap-0.5 p-1.5 hover:bg-gray-200/60 rounded cursor-pointer transition-colors border border-transparent hover:border-zinc-200"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[7px] font-bold px-1 py-0.2 rounded border scale-95 shrink-0 ${getMethodColor(h.method)}`}
                    >
                      {h.method}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-gray-600 truncate flex-1">
                      {h.url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                    </span>
                  </div>
                  <div className="text-[8px] text-gray-400 pl-8">{h.timestamp}</div>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-400 italic text-center p-4">
                No request history yet.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostmanSidebar;
