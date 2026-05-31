import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { INITIAL_FILES } from "./vscodeData";

const useVSCode = () => {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState("src/App.jsx");
  const [openTabs, setOpenTabs] = useState(["src/App.jsx"]);
  const [activeSidebarTab, setActiveSidebarTab] = useState("explorer");
  const [explorerExpanded, setExplorerExpanded] = useState({ src: true, root: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [modifiedFiles, setModifiedFiles] = useState({});
  const [installedExtensions, setInstalledExtensions] = useState(["GitHub Copilot", "Prettier"]);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "output", text: "Microsoft Windows / macOS Terminal Simulator" },
    { type: "output", text: "VS Code Integrated Terminal -- type 'help' for commands." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBottomRef = useRef(null);

  const handleContentChange = useCallback(
    (newVal) => {
      setFiles((prev) => ({ ...prev, [activeFile]: newVal }));
      const initialContent = INITIAL_FILES[activeFile];
      if (newVal !== initialContent) {
        setModifiedFiles((prev) => ({ ...prev, [activeFile]: initialContent }));
      } else {
        setModifiedFiles((prev) => {
          const next = { ...prev };
          delete next[activeFile];
          return next;
        });
      }
    },
    [activeFile],
  );

  const selectFile = useCallback((filePath) => {
    setActiveFile(filePath);
    setOpenTabs((prev) => (prev.includes(filePath) ? prev : [...prev, filePath]));
  }, []);

  const closeTab = useCallback(
    (filePath, e) => {
      e.stopPropagation();
      setOpenTabs((prev) => {
        const next = prev.filter((t) => t !== filePath);
        if (activeFile === filePath && next.length > 0) {
          setActiveFile(next[next.length - 1]);
        }
        return next;
      });
    },
    [activeFile],
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const query = searchQuery.toLowerCase();
    const results = [];
    Object.entries(files).forEach(([path, content]) => {
      const lines = content.split("\n");
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(query)) {
          results.push({ path, lineNum: idx + 1, text: line.trim() });
        }
      });
    });
    return results;
  }, [searchQuery, files]);

  const runCommand = useCallback(
    (cmdStr) => {
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
            "  clear          - Clear the terminal screen",
          ];
          break;
        case "ls":
          output = [
            "Directory: /workspace",
            "Mode          LastWriteTime     Length Name",
            "----          -------------     ------ ----",
            "-a---   2026-05-27  13:50:00        253 package.json",
            "-a---   2026-05-27  13:50:00        415 README.md",
            "d----   2026-05-27  13:50:00          - src",
          ];
          break;
        case "cat": {
          if (!args[0]) {
            output = ["Error: cat requires a file argument. (e.g. cat README.md)"];
          } else {
            let target = args[0];
            if (target === "App.jsx" || target === "index.css") target = "src/" + target;
            if (files[target] !== undefined) {
              output = files[target].split("\n");
            } else {
              output = [`cat: ${args[0]}: No such file or directory`];
            }
          }
          break;
        }
        case "clear":
          setTerminalHistory([]);
          return;
        case "git": {
          const sub = args[0] ? args[0].toLowerCase() : "";
          if (sub === "status") {
            const modifiedList = Object.keys(modifiedFiles);
            if (modifiedList.length === 0) {
              output = [
                "On branch main",
                "Your branch is up to date with 'origin/main'.",
                "",
                "nothing to commit, working tree clean",
              ];
            } else {
              output = [
                "On branch main",
                "Changes not staged for commit:",
                ...modifiedList.map((f) => `\tmodified:   ${f}`),
                "",
                'no changes added to commit (use "git add" and/or "git commit -a")',
              ];
            }
          } else if (sub === "diff") {
            const modifiedList = Object.keys(modifiedFiles);
            if (modifiedList.length === 0) {
              output = ["No changes to diff."];
            } else {
              output = [];
              modifiedList.forEach((file) => {
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
        }
        case "bun":
          if (args[0] === "run" && args[1] === "dev") {
            output = [
              "  bun x next dev",
              "  ▲ Next.js 16.2.6  ready in 254 ms",
              "",
              "  ➜  Local:   http://localhost:3000/",
              "  ➜  press h + enter to show help",
            ];
          } else {
            output = ["Command supports 'bun run dev'"];
          }
          break;
        default:
          output = [`bash: ${command}: command not found. Try 'help'.`];
      }

      setTerminalHistory((prev) => [
        ...prev,
        { type: "input", text: cmdStr },
        ...output.map((line) => ({ type: "output", text: line })),
      ]);
    },
    [files, modifiedFiles],
  );

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  return {
    files,
    setFiles,
    activeFile,
    openTabs,
    activeSidebarTab,
    setActiveSidebarTab,
    explorerExpanded,
    setExplorerExpanded,
    searchQuery,
    setSearchQuery,
    searchResults,
    commitMessage,
    setCommitMessage,
    modifiedFiles,
    setModifiedFiles,
    installedExtensions,
    setInstalledExtensions,
    terminalHistory,
    terminalInput,
    setTerminalInput,
    terminalBottomRef,
    handleContentChange,
    selectFile,
    closeTab,
    runCommand,
  };
};

export default useVSCode;
