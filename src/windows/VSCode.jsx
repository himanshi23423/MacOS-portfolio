import { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { 
  Files, 
  Search, 
  GitBranch, 
  Blocks, 
  Settings, 
  Play, 
  Terminal as TerminalIcon, 
  ChevronDown, 
  ChevronRight, 
  FileCode, 
  X, 
  Info,
  CheckCircle,
  FileText
} from "lucide-react";

// Preloaded mock files for VS Code Explorer
const INITIAL_FILES = {
  "src/App.jsx": `import React from 'react';

export default function App() {
  return (
    <div className="portfolio">
      <h1>Welcome to my macOS Portfolio</h1>
      <p>Explore my projects and skills using the desktop apps!</p>
    </div>
  );
}`,
  "src/index.css": `:root {
  --primary: #007acc;
  --background: #1e1e1e;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--background);
}`,
  "package.json": `{
  "name": "macos-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.2.0",
    "tailwindcss": "^4.1.17"
  }
}`,
  "README.md": `# macOS Portfolio Simulation

This is an interactive macOS desktop portfolio simulation built with React, Vite, Tailwind CSS, and GSAP.

## Features
- Fully draggable and resizable windows
- Mock Chrome browser with interactive profile sites
- Safari with clickable favorite bookmarks
- Integrated VS Code editor (you are here!)

## Get Started
Run the dev server:
\`\`\`bash
bun run dev
\`\`\`
`
};

const VSCode = () => {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState("src/App.jsx");
  const [openTabs, setOpenTabs] = useState(["src/App.jsx"]);
  const [activeSidebarTab, setActiveSidebarTab] = useState("explorer"); // 'explorer', 'search', 'git', 'extensions'
  const [explorerExpanded, setExplorerExpanded] = useState({ src: true, root: true });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // Source control (git) state
  const [commitMessage, setCommitMessage] = useState("");
  const [modifiedFiles, setModifiedFiles] = useState({}); // tracks filename -> originalContent
  
  // Extensions state
  const [installedExtensions, setInstalledExtensions] = useState(["GitHub Copilot", "Prettier"]);
  const extensionsList = [
    { name: "GitHub Copilot", desc: "Your AI pair programmer", publisher: "GitHub", version: "v1.254" },
    { name: "Prettier", desc: "Opinionated code formatter", publisher: "Prettier", version: "v10.2" },
    { name: "Tailwind CSS IntelliSense", desc: "Intelligent Tailwind CSS tooling", publisher: "Tailwind Labs", version: "v0.11" },
    { name: "GitLens", desc: "Supercharge Git within VS Code", publisher: "GitKraken", version: "v15.0" },
  ];

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "output", text: "Microsoft Windows / macOS Terminal Simulator" },
    { type: "output", text: "VS Code Integrated Terminal -- type 'help' for commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBottomRef = useRef(null);

  // Monitor modifications for Git tab
  const handleContentChange = (newVal) => {
    setFiles(prev => ({
      ...prev,
      [activeFile]: newVal
    }));

    // If it differs from initial, mark as modified
    const initialContent = INITIAL_FILES[activeFile];
    if (newVal !== initialContent) {
      setModifiedFiles(prev => ({
        ...prev,
        [activeFile]: initialContent
      }));
    } else {
      setModifiedFiles(prev => {
        const next = { ...prev };
        delete next[activeFile];
        return next;
      });
    }
  };

  // Switch to or open file
  const selectFile = (filePath) => {
    setActiveFile(filePath);
    if (!openTabs.includes(filePath)) {
      setOpenTabs([...openTabs, filePath]);
    }
  };

  // Close tab
  const closeTab = (filePath, e) => {
    e.stopPropagation();
    const nextTabs = openTabs.filter(t => t !== filePath);
    setOpenTabs(nextTabs);
    if (activeFile === filePath && nextTabs.length > 0) {
      setActiveFile(nextTabs[nextTabs.length - 1]);
    }
  };

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = [];
    Object.entries(files).forEach(([path, content]) => {
      const lines = content.split("\n");
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(query)) {
          results.push({
            path,
            lineNum: idx + 1,
            text: line.trim()
          });
        }
      });
    });
    setSearchResults(results);
  }, [searchQuery, files]);

  // Terminal command handling
  const runCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = [];
    
    switch (command) {
      case "help":
        output = [
          "Available commands:",
          "  help           - Show list of commands",
          "  ls             - List workspace files",
          "  cat [file]     - Display file contents",
          "  git status     - Show git repository status",
          "  git diff       - Show file changes compared to original",
          "  bun run dev    - Spin up the Vite development server",
          "  clear          - Clear the terminal screen"
        ];
        break;
      case "ls":
        output = [
          "Directory: /workspace",
          "Mode          LastWriteTime     Length Name",
          "----          -------------     ------ ----",
          "-a---   2026-05-27  13:50:00        253 package.json",
          "-a---   2026-05-27  13:50:00        415 README.md",
          "d----   2026-05-27  13:50:00          - src"
        ];
        break;
      case "cat":
        if (!args[0]) {
          output = ["Error: cat requires a file argument. (e.g. cat README.md)"];
        } else {
          // Normalize paths
          let target = args[0];
          if (target === "App.jsx" || target === "index.css") {
            target = "src/" + target;
          }
          if (files[target] !== undefined) {
            output = files[target].split("\n");
          } else {
            output = [`cat: ${args[0]}: No such file or directory`];
          }
        }
        break;
      case "clear":
        setTerminalHistory([]);
        return;
      case "git":
        const sub = args[0] ? args[0].toLowerCase() : "";
        if (sub === "status") {
          const modifiedList = Object.keys(modifiedFiles);
          if (modifiedList.length === 0) {
            output = [
              "On branch main",
              "Your branch is up to date with 'origin/main'.",
              "",
              "nothing to commit, working tree clean"
            ];
          } else {
            output = [
              "On branch main",
              "Changes not staged for commit:",
              "  (use \"git add <file>...\" to update what will be committed)",
              "  (use \"git restore <file>...\" to discard changes in working directory)",
              "",
              ...modifiedList.map(f => `\tmodified:   ${f}`),
              "",
              "no changes added to commit (use \"git add\" and/or \"git commit -a\")"
            ];
          }
        } else if (sub === "diff") {
          const modifiedList = Object.keys(modifiedFiles);
          if (modifiedList.length === 0) {
            output = ["No changes to diff."];
          } else {
            output = [];
            modifiedList.forEach(file => {
              output.push(`diff --git a/${file} b/${file}`);
              output.push(`--- a/${file}`);
              output.push(`+++ b/${file}`);
              output.push(`@@ -1,5 +1,5 @@`);
              output.push(`- [original lines]`);
              output.push(`+ [modified lines]`);
              output.push(`\n${files[file]}`);
            });
          }
        } else {
          output = ["git subcommands supported: status, diff"];
        }
        break;
      case "bun":
        if (args[0] === "run" && args[1] === "dev") {
          output = [
            "  bun x --bun vite",
            "  VITE v7.2.4  ready in 254 ms",
            "",
            "  ➜  Local:   http://localhost:5173/",
            "  ➜  Network: use --host to expose",
            "  ➜  press h + enter to show help"
          ];
        } else {
          output = ["Command supports 'bun run dev'"];
        }
        break;
      default:
        output = [`bash: ${command}: command not found. Try 'help'.`];
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: "input", text: cmdStr },
      ...output.map(line => ({ type: "output", text: line }))
    ]);
  };

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  // Render tree helper
  const renderTreeItem = (name, isFolder, path) => {
    const isSelected = activeFile === path;
    const isExpanded = explorerExpanded[name];
    
    if (isFolder) {
      return (
        <div key={name} className="select-none">
          <div 
            onClick={() => setExplorerExpanded(prev => ({ ...prev, [name]: !prev[name] }))}
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
                  return renderTreeItem(filename, false, p);
                })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        key={path}
        onClick={() => selectFile(path)}
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

  return (
    <div className="flex flex-col h-full w-full bg-white text-[#333333] font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80">
      
      {/* VS Code Titlebar */}
      <div id="window-header" className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-zinc-600 font-sans">
        <div className="flex items-center gap-2">
          <WindowControls target="vscode" />
          <div className="flex items-center gap-3 pl-4 font-semibold select-none hidden md:flex">
            <span className="hover:text-zinc-900 cursor-pointer">File</span>
            <span className="hover:text-zinc-900 cursor-pointer">Edit</span>
            <span className="hover:text-zinc-900 cursor-pointer">Selection</span>
            <span className="hover:text-zinc-900 cursor-pointer">View</span>
            <span className="hover:text-zinc-900 cursor-pointer">Go</span>
          </div>
        </div>
        <div className="flex-1 text-center font-medium text-[11px] truncate px-4">
          {activeFile} — macos-portfolio (Workspace)
        </div>
        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded font-bold">Local</span>
        </div>
      </div>

      {/* Main VS Code Layout */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Activity Bar (Vertical Left) */}
        <div className="w-12 bg-[#ececec] border-r border-zinc-200 flex flex-col justify-between items-center py-2 shrink-0">
          <div className="flex flex-col gap-5 items-center w-full">
            <button 
              onClick={() => setActiveSidebarTab("explorer")}
              className={`p-2 transition-colors relative ${activeSidebarTab === "explorer" ? "text-blue-600 border-l-2 border-blue-500 bg-white" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <Files size={20} />
            </button>
            <button 
              onClick={() => setActiveSidebarTab("search")}
              className={`p-2 transition-colors relative ${activeSidebarTab === "search" ? "text-blue-600 border-l-2 border-blue-500 bg-white" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setActiveSidebarTab("git")}
              className={`p-2 transition-colors relative ${activeSidebarTab === "git" ? "text-blue-600 border-l-2 border-blue-500 bg-white" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <GitBranch size={20} />
              {Object.keys(modifiedFiles).length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                  {Object.keys(modifiedFiles).length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveSidebarTab("extensions")}
              className={`p-2 transition-colors relative ${activeSidebarTab === "extensions" ? "text-blue-600 border-l-2 border-blue-500 bg-white" : "text-zinc-500 hover:text-zinc-900"}`}
            >
              <Blocks size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-2 text-zinc-500 hover:text-zinc-900">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="w-56 bg-[#f3f3f3] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
          
          {/* Explorer Tab */}
          {activeSidebarTab === "explorer" && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                <span>Explorer</span>
                <ChevronDown size={14} />
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {/* Workspace Folder Header */}
                <div className="flex items-center gap-1.5 py-1 px-2 text-xs font-bold text-zinc-700">
                  <ChevronDown size={14} />
                  <span>WORKSPACE</span>
                </div>

                {/* Root Files */}
                {Object.keys(files)
                  .filter(p => !p.includes("/"))
                  .map(p => renderTreeItem(p, false, p))}

                {/* Folder Structure */}
                {renderTreeItem("src", true, "src")}
              </div>
            </div>
          )}

          {/* Search Tab */}
          {activeSidebarTab === "search" && (
            <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Search</div>
              <input 
                type="text"
                placeholder="Search text in workspace"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-zinc-300 rounded px-2.5 py-1.5 text-xs text-zinc-800 outline-none focus:border-blue-500 shadow-sm"
              />
              <div className="flex-1 overflow-y-auto space-y-2.5 pt-2">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <div 
                      key={i} 
                      onClick={() => selectFile(res.path)}
                      className="text-[11px] p-2 hover:bg-zinc-200 rounded cursor-pointer border border-transparent hover:border-zinc-300 transition-all"
                    >
                      <div className="font-semibold text-blue-600 truncate">{res.path}</div>
                      <div className="text-zinc-500 mt-0.5 italic">Line {res.lineNum}: <span className="text-zinc-800 not-italic font-mono bg-yellow-105 px-0.5 rounded">{res.text}</span></div>
                    </div>
                  ))
                ) : (
                  searchQuery.trim() && <div className="text-xs text-zinc-500 text-center py-4">No results found.</div>
                )}
              </div>
            </div>
          )}

          {/* Source Control Tab */}
          {activeSidebarTab === "git" && (
            <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Source Control: Git</div>
              
              <div className="space-y-1">
                <input 
                  type="text"
                  placeholder="Commit message..."
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded px-2.5 py-1.5 text-xs text-zinc-800 outline-none focus:border-blue-500 shadow-sm"
                />
                <button 
                  onClick={() => {
                    if (!commitMessage.trim()) {
                      alert("Please type a commit message first!");
                      return;
                    }
                    alert(`Successfully committed changes to main:\n"${commitMessage}"`);
                    setModifiedFiles({});
                    setCommitMessage("");
                  }}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors mt-2"
                >
                  Commit to main
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pt-2">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Changes</div>
                {Object.keys(modifiedFiles).length > 0 ? (
                  Object.keys(modifiedFiles).map(file => (
                    <div 
                      key={file}
                      onClick={() => selectFile(file)}
                      className="flex items-center justify-between p-1.5 hover:bg-zinc-200 rounded cursor-pointer text-xs text-zinc-700"
                    >
                      <span className="truncate">{file}</span>
                      <span className="text-[10px] text-amber-600 font-bold px-1.5 bg-amber-500/10 rounded">M</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-zinc-500 text-center py-4">No modified files.</div>
                )}
              </div>
            </div>
          )}

          {/* Extensions Tab */}
          {activeSidebarTab === "extensions" && (
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
                        <button 
                          onClick={() => {
                            if (isInstalled) {
                              setInstalledExtensions(prev => prev.filter(n => n !== ext.name));
                            } else {
                              setInstalledExtensions(prev => [...prev, ext.name]);
                            }
                          }}
                          className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                            isInstalled 
                              ? "bg-zinc-200 text-zinc-700 hover:bg-red-50 hover:text-red-600" 
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {isInstalled ? "Disable" : "Install"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Editor Area & Integrated Bottom Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Tabs header */}
          <div className="h-9 bg-[#ececec] flex items-center border-b border-zinc-200 overflow-x-auto shrink-0 select-none">
            {openTabs.map(tab => {
              const isActive = activeFile === tab;
              return (
                <div 
                  key={tab}
                  onClick={() => selectFile(tab)}
                  className={`h-full flex items-center gap-2 px-3 border-r border-zinc-200 cursor-pointer text-xs relative shrink-0 transition-all ${
                    isActive ? "bg-white text-zinc-800 font-bold border-t-2 border-blue-500" : "bg-[#ececec] text-zinc-500 hover:bg-zinc-150 hover:text-zinc-800"
                  }`}
                >
                  <FileCode size={12} className={tab.endsWith(".json") ? "text-yellow-600" : tab.endsWith(".md") ? "text-sky-500" : "text-amber-500"} />
                  <span className="font-semibold">{tab.split("/").pop()}</span>
                  <button 
                    onClick={(e) => closeTab(tab, e)}
                    className="p-0.5 rounded-full hover:bg-zinc-300 text-zinc-500 hover:text-zinc-800"
                  >
                    <X size={10} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active File Editor Workspace */}
          <div className="flex-1 min-h-0 flex relative">
            {openTabs.length > 0 ? (
              <div className="flex-1 flex font-mono text-xs">
                
                {/* Code input text area */}
                <textarea 
                  value={files[activeFile] || ""}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full h-full bg-white text-zinc-800 p-4 border-none outline-none resize-none font-mono text-xs leading-relaxed select-text"
                  style={{ whiteSpace: "pre", overflowY: "auto" }}
                  spellCheck="false"
                />

                {/* Micro Save Indicator */}
                {modifiedFiles[activeFile] && (
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1.5 rounded-md text-[10px] text-amber-600 font-bold pointer-events-none animate-pulse">
                    <span>Unsaved Changes</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-zinc-500 text-center select-none">
                <FileText size={48} className="text-zinc-400 mb-3 animate-pulse" />
                <h4 className="text-sm font-bold text-zinc-400">No Editors Open</h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">Select a file from the explorer list on the left side panel to view or edit.</p>
              </div>
            )}
          </div>

          {/* Integrated VS Code Terminal Panel */}
          <div className="h-44 bg-zinc-50 border-t border-zinc-200 flex flex-col shrink-0 select-none">
            {/* Header Tabs */}
            <div className="bg-[#f3f3f3] px-4 py-1.5 border-b border-zinc-200 flex items-center justify-between text-[11px] text-zinc-600">
              <div className="flex items-center gap-4 font-semibold">
                <span className="hover:text-zinc-800 cursor-pointer">Problems</span>
                <span className="hover:text-zinc-800 cursor-pointer">Output</span>
                <span className="hover:text-zinc-800 cursor-pointer">Debug Console</span>
                <span className="text-zinc-950 border-b-2 border-blue-600 pb-0.5 cursor-pointer font-bold">Terminal</span>
              </div>
              <div className="flex items-center gap-3">
                <Play size={12} className="text-green-600 cursor-pointer" />
                <TerminalIcon size={12} />
              </div>
            </div>

            {/* Scroll Terminal Log Output */}
            <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] select-text">
              <div className="space-y-1">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={item.type === "input" ? "text-green-600 font-bold" : "text-zinc-700 leading-normal"}>
                    {item.type === "input" ? `➜ /workspace $ ${item.text}` : item.text}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>
            </div>

            {/* Terminal Input Bar */}
            <div className="bg-[#f0f0f0] px-3 py-1 flex items-center gap-2 border-t border-zinc-200 shrink-0">
              <span className="text-green-600 font-bold font-mono text-xs">➜ /workspace $</span>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    runCommand(terminalInput);
                    setTerminalInput("");
                  }
                }}
                placeholder="type 'help' for available workspace commands..."
                className="flex-1 bg-transparent border-none outline-none text-zinc-800 text-xs font-mono select-text"
              />
            </div>
          </div>

        </div>

      </div>

      {/* VS Code Bottom Status Bar */}
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

    </div>
  );
};

const VSCodeWindow = windowWrapper(VSCode, "vscode");
export default VSCodeWindow;
