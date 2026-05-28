import { Plus, Folder, FolderOpen, ChevronRight, ChevronDown, Layers } from "lucide-react";
import MOCK_COLLECTIONS from "./postmanData";

const getMethodColor = (m) => {
  switch (m) {
    case "GET": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "POST": return "text-orange-600 bg-orange-50 border-orange-200";
    case "PUT": return "text-blue-600 bg-blue-50 border-blue-200";
    case "DELETE": return "text-rose-600 bg-rose-50 border-rose-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const PostmanSidebar = ({ expandedFolders, setExpandedFolders, loadRequest, url, method }) => (
  <div className="w-56 bg-[#f8f9fa] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
    <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between border-b border-zinc-200">
      <span className="flex items-center gap-1.5"><Layers size={12} className="text-orange-500" /> Collections</span>
      <Plus size={14} className="hover:text-gray-800 cursor-pointer" />
    </div>

    <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
      {MOCK_COLLECTIONS.map(folder => {
        const isExpanded = expandedFolders[folder.name];
        return (
          <div key={folder.name} className="space-y-0.5">
            <div
              onClick={() => setExpandedFolders(p => ({ ...p, [folder.name]: !p[folder.name] }))}
              className="flex items-center gap-1.5 py-1 px-2 hover:bg-gray-200/60 rounded cursor-pointer text-xs font-semibold text-gray-700"
            >
              {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              {isExpanded ? <FolderOpen size={13} className="text-amber-500" /> : <Folder size={13} className="text-amber-500" />}
              <span className="truncate">{folder.name}</span>
            </div>
            {isExpanded && (
              <div className="pl-4 border-l border-zinc-200 ml-3.5 space-y-0.5">
                {folder.requests.map(req => (
                  <div
                    key={req.id}
                    onClick={() => loadRequest(req)}
                    className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-200/60 rounded cursor-pointer text-[11px] font-medium transition-colors ${
                      url === req.url && method === req.method ? "bg-gray-200/80 text-gray-900 border-r-2 border-orange-500" : "text-gray-600"
                    }`}
                  >
                    <span className={`text-[8px] font-bold px-1 py-0.5 rounded border ${getMethodColor(req.method)}`}>
                      {req.method}
                    </span>
                    <span className="truncate">{req.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default PostmanSidebar;
