import { useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { techStack } from "#constants";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);
  const commandRef = useRef("");

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
      theme: {
        background: "#ffffff",
        foreground: "#333333",
        cursor: "#333333",
        selectionBackground: "#b5d5ff",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    fitAddon.fit();
    
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const prompt = () => {
      term.write("\r\n\x1b[1;32mkuldeep\x1b[0m@macbook ~ % ");
    };

    const println = (msg) => {
      term.write("\r\n" + msg);
    };

    // Initial greeting
    term.write("Last login: " + new Date().toLocaleString() + " / help?");
    prompt();

    term.onData((data) => {
      const code = data.charCodeAt(0);
      
      // Handle Enter
      if (code === 13) {
        const cmd = commandRef.current.trim();
        if (cmd === "") {
          prompt();
          return;
        }

        const args = cmd.split(" ");
        const baseCmd = args[0].toLowerCase();

        switch (baseCmd) {
          case "help":
            println("Available commands:");
            println("  help      - Show this help message");
            println("  clear     - Clear the terminal screen");
            println("  echo      - Print text to the terminal");
            println("  date      - Print the current date and time");
            println("  whoami    - Print the current user");
            println("  techstack - Display my tech stack");
            println("  sudo      - Execute a command as superuser");
            break;
          case "clear":
            term.clear();
            break;
          case "echo":
            println(args.slice(1).join(" "));
            break;
          case "date":
            println(new Date().toString());
            break;
          case "whoami":
            println("kuldeep");
            break;
          case "sudo":
            println("kuldeep is not in the sudoers file. This incident will be reported.");
            break;
          case "techstack":
            println("\x1b[1;34m=== Tech Stack ===\x1b[0m");
            techStack.forEach(({ category, items }) => {
              println(`\x1b[1;32m${category}:\x1b[0m`);
              println(`  ${items.join(", ")}`);
            });
            break;
          default:
            println(`zsh: command not found: ${baseCmd}`);
        }

        commandRef.current = "";
        prompt();
      } 
      // Handle Backspace (127) or Delete (8)
      else if (code === 127 || code === 8) {
        if (commandRef.current.length > 0) {
          // Remove last char from memory
          commandRef.current = commandRef.current.slice(0, -1);
          // Move cursor back, overwrite with space, move cursor back
          term.write("\b \b");
        }
      } 
      // Handle visible characters
      else if (code >= 32 && code <= 126) {
        commandRef.current += data;
        term.write(data);
      }
    });

    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial resize to ensure proper fitting
    setTimeout(() => {
      handleResize();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden shadow-xl border border-black/10">
      <div id="window-header" className="shrink-0 bg-[#e8e8e8]/50 border-b border-black/10 px-4 py-3 flex items-center">
        <WindowControls target="terminal" />
        <h2 className="flex-1 text-center text-[13px] font-semibold text-gray-700">kuldeep — -zsh</h2>
      </div>
      <div 
        ref={terminalRef} 
        className="flex-1 w-full bg-white p-2 outline-none xterm-wrapper"
        style={{ overflow: "hidden" }}
      />
    </div>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");
export default TerminalWindow;
