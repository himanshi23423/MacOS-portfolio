import { Files, Search, GitBranch, Blocks, Settings, ChevronDown, ChevronRight, FileCode, Play, Terminal as TerminalIcon } from "lucide-react";
import { extensionsList } from "./vscodeData";

const renderTreeItem = (name, isFolder, path, activeFile, files, explorerExpanded, onToggleExpand, onSelectFile) => {
  const isSelected = activeFile === path;
  const isExpanded = explorerExpanded[name];

  if (isFolder) {
    return (
      <div key={name} className="select-none">
        <div
          onClick={() => onToggleExpand(name)}
          className="flex items-center gap-1 py-1 px-3 hover:bg-zinc-200 cursor-pointer text-zinc-700 hover:text-zinc-950 text-xs font-semibold"
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className="text-blue-500 font-extrabold text-[10px]">📁</span>
          <span>{name}</span>
        </div>
        {isExpanded && (
          <div className="pl-4">
            {Object.keys(files)
              .filter(p => p.startsWith(name + "/"))
              .map(p => {
                const filename = p.replace(name + "/", "");
                return renderTreeItem(filename, false, p, activeFile, files, explorerExpanded, onToggleExpand, onSelectFile);
              })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      key={path}
      onClick={() => onSelectFile(path)}
      className={`flex items-center gap-2 py-1 px-5 hover:bg-zinc-200 cursor-pointer text-xs transition-colors ${
        isSelected
          ? "bg-white text-blue-600 font-bold border-l-2 border-blue-500 shadow-sm"
          : "text-zinc-600 hover:text-zinc-900"
      }`}
    >
      <FileCode size={13} className={path.endsWith(".json") ? "text-yellow-600" : path.endsWith(".md") ? "text-sky-500" : "text-amber-500"} />
      <span className="truncate">{name}</span>
    </div>
  );
};

const VSCodeActivityBar = ({ activeSidebarTab, onTabChange, modifiedCount }) => {
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
            onClick={() => onTabChange(id)}
            className={`p-2 transition-colors relative ${activeSidebarTab === id ? "text-blue-600 border-l-2 border-blue-500 bg-white" : "text-zinc-500 hover:text-zinc-900"}`}
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
      <div className="flex flex-col items-center">
        <button className="p-2 text-zinc-500 hover:text-zinc-900">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

const VSCodeExplorerPanel = ({ files, activeFile, explorerExpanded, onToggleExpand, onSelectFile }) => (
  <div className="flex-1 flex flex-col min-h-0">
    <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
      <span>Explorer</span>
      <ChevronDown size={14} />
    </div>
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-1.5 py-1 px-2 text-xs font-bold text-zinc-700">
        <ChevronDown size={14} />
        <span>WORKSPACE</span>
      </div>
      {Object.keys(files).filter(p => !p.includes("/")).map(p =>
        renderTreeItem(p, false, p, activeFile, files, explorerExpanded, onToggleExpand, onSelectFile)
      )}
      {renderTreeItem("src", true, "src", activeFile, files, explorerExpanded, onToggleExpand, onSelectFile)}
    </div>
  </div>
);

const VSCodeSearchPanel = ({ searchQuery, onSearchChange, searchResults, onSelectFile }) => (
  <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Search</div>
    <input
      type="text"
      placeholder="Search text in workspace"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full bg-white border border-zinc-300 rounded px-2.5 py-1.5 text-xs text-zinc-800 outline-none focus:border-blue-500 shadow-sm"
    />
    <div className="flex-1 overflow-y-auto space-y-2.5 pt-2">
      {searchResults.length > 0 ? (
        searchResults.map((res, i) => (
          <div key={i} onClick={() => onSelectFile(res.path)} className="text-[11px] p-2 hover:bg-zinc-200 rounded cursor-pointer border border-transparent hover:border-zinc-300 transition-all">
            <div className="font-semibold text-blue-600 truncate">{res.path}</div>
            <div className="text-zinc-500 mt-0.5 italic">Line {res.lineNum}: <span className="text-zinc-800 not-italic font-mono bg-yellow-105 px-0.5 rounded">{res.text}</span></div>
          </div>
        ))
      ) : (
        searchQuery.trim() && <div className="text-xs text-zinc-500 text-center py-4">No results found.</div>
      )}
    </div>
  </div>
);

const VSCodeGitPanel = ({ modifiedFiles, commitMessage, onCommitMessageChange, onCommit, onSelectFile }) => (
  <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Source Control: Git</div>
    <div className="space-y-1">
      <input
        type="text"
        placeholder="Commit message..."
        value={commitMessage}
        onChange={(e) => onCommitMessageChange(e.target.value)}
        className="w-full bg-white border border-zinc-300 rounded px-2.5 py-1.5 text-xs text-zinc-800 outline-none focus:border-blue-500 shadow-sm"
      />
      <button onClick={onCommit} className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors mt-2">
        Commit to main
      </button>
    </div>
    <div className="flex-1 overflow-y-auto pt-2">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Changes</div>
      {Object.keys(modifiedFiles).length > 0 ? (
        Object.keys(modifiedFiles).map(file => (
          <div key={file} onClick={() => onSelectFile(file)} className="flex items-center justify-between p-1.5 hover:bg-zinc-200 rounded cursor-pointer text-xs text-zinc-700">
            <span className="truncate">{file}</span>
            <span className="text-[10px] text-amber-600 font-bold px-1.5 bg-amber-500/10 rounded">M</span>
          </div>
        ))
      ) : (
        <div className="text-xs text-zinc-500 text-center py-4">No modified files.</div>
      )}
    </div>
  </div>
);

const VSCodeExtensionsPanel = ({ installedExtensions, onToggleExtension }) => (
  <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Extensions Marketplace</div>
    <div className="flex-1 overflow-y-auto space-y-3.5">
      {extensionsList.map(ext => {
        const isInstalled = installedExtensions.includes(ext.name);
        return (
          <div key={ext.name} className="p-2 border border-zinc-200 bg-white rounded space-y-1 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="font-semibold text-xs text-zinc-800">{ext.name}</div>
              <span className="text-[9px] text-zinc-500">{ext.version}</span>
            </div>
            <p className="text-[10px] text-zinc-600 leading-tight">{ext.desc}</p>
            <div className="flex justify-between items-center pt-1.5">
              <span className="text-[9px] text-zinc-500">by {ext.publisher}</span>
              <button onClick={() => onToggleExtension(ext.name)} className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                isInstalled ? "bg-zinc-200 text-zinc-700 hover:bg-red-50 hover:text-red-600" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}>
                {isInstalled ? "Disable" : "Install"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const VSCodeSidebar = ({
  activeSidebarTab,
  files,
  activeFile,
  explorerExpanded,
  searchQuery,
  searchResults,
  commitMessage,
  modifiedFiles,
  installedExtensions,
  onActivityTabChange,
  onToggleExpand,
  onSelectFile,
  onSearchChange,
  onCommitMessageChange,
  onCommit,
  onToggleExtension,
}) => {
  return (
    <div className="w-56 bg-[#f3f3f3] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
      {activeSidebarTab === "explorer" && (
        <VSCodeExplorerPanel
          files={files}
          activeFile={activeFile}
          explorerExpanded={explorerExpanded}
          onToggleExpand={onToggleExpand}
          onSelectFile={onSelectFile}
        />
      )}
      {activeSidebarTab === "search" && (
        <VSCodeSearchPanel
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          searchResults={searchResults}
          onSelectFile={onSelectFile}
        />
      )}
      {activeSidebarTab === "git" && (
        <VSCodeGitPanel
          modifiedFiles={modifiedFiles}
          commitMessage={commitMessage}
          onCommitMessageChange={onCommitMessageChange}
          onCommit={onCommit}
          onSelectFile={onSelectFile}
        />
      )}
      {activeSidebarTab === "extensions" && (
        <VSCodeExtensionsPanel
          installedExtensions={installedExtensions}
          onToggleExtension={onToggleExtension}
        />
      )}
    </div>
  );
};

export { VSCodeActivityBar, VSCodeExplorerPanel, VSCodeSearchPanel, VSCodeGitPanel, VSCodeExtensionsPanel };
export default VSCodeSidebar;
