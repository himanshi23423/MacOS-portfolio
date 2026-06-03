import React, { useEffect, useState } from "react";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { techStack, projects } from "@constants";

const TerminalInput = ({ terminalRef, xtermRef, fitAddonRef, commandRef }) => {
  const [activeTerm, setActiveTerm] = useState(null);

  const shortcutKeys = [
    { label: "help", cmd: "help" },
    { label: "clear", cmd: "clear" },
    { label: "techstack", cmd: "techstack" },
    { label: "projects", cmd: "projects" },
    { label: "whoami", cmd: "whoami" },
    { label: "sudo", cmd: "sudo" },
  ];

  const handleShortcutClick = (cmd) => {
    const term = activeTerm;
    if (!term) return;

    // Output command string to console
    term.write(cmd);

    // Command execution logic
    const println = (msg) => {
      term.write("\r\n" + msg + "\x1b[0m");
    };

    const prompt = () => {
      term.write("\r\n\x1b[1;32mkuldeep@macbook ~ %\x1b[0m ");
    };

    if (cmd === "clear") {
      term.clear();
      prompt();
      commandRef.current = "";
      return;
    }

    const args = cmd.split(" ");
    const baseCmd = args[0].toLowerCase();

    switch (baseCmd) {
      case "help":
        println("\x1b[1;38;2;219;39;119m=== Available Commands ===\x1b[0m");
        println(
          "\x1b[1;38;2;16;185;129mhelp\x1b[0m      \x1b[38;2;75;85;99m- Show help message\x1b[0m",
        );
        println("\x1b[1;38;2;16;185;129mclear\x1b[0m     \x1b[38;2;75;85;99m- Clear screen\x1b[0m");
        println("\x1b[1;38;2;16;185;129mecho\x1b[0m      \x1b[38;2;75;85;99m- Print text\x1b[0m");
        println(
          "\x1b[1;38;2;16;185;129mdate\x1b[0m      \x1b[38;2;75;85;99m- Print date/time\x1b[0m",
        );
        println(
          "\x1b[1;38;2;16;185;129mwhoami\x1b[0m    \x1b[38;2;75;85;99m- Print current user\x1b[0m",
        );
        println(
          "\x1b[1;38;2;16;185;129mtechstack\x1b[0m \x1b[38;2;75;85;99m- Display tech stack\x1b[0m",
        );
        println(
          "\x1b[1;38;2;16;185;129mprojects\x1b[0m  \x1b[38;2;75;85;99m- Display portfolio projects\x1b[0m",
        );
        println(
          "\x1b[1;38;2;16;185;129msudo\x1b[0m      \x1b[38;2;75;85;99m- Run superuser command\x1b[0m",
        );
        break;
      case "techstack":
        println("\x1b[1;38;2;219;39;119m=== Tech Stack ===\x1b[0m");
        techStack.forEach(({ category, items }) => {
          println(`\x1b[1;38;2;6;182;212m${category}:\x1b[0m`);
          println(`\x1b[38;2;75;85;99m${items.join(", ")}\x1b[0m`);
        });
        break;
      case "projects":
        println("\x1b[1;38;2;219;39;119m=== Portfolio Projects ===\x1b[0m");
        projects.forEach((proj) => {
          println(`\x1b[1;38;2;16;185;129m• ${proj.title}\x1b[0m`);
          println("\x1b[1;38;2;245;158;11mDescription:\x1b[0m");
          println(`\x1b[38;2;75;85;99m${proj.description}\x1b[0m`);
          if (proj.link) {
            println("\x1b[1;38;2;6;182;212mLive Demo:\x1b[0m");
            println(`\x1b[4;38;2;37;99;235m${proj.link}\x1b[0m`);
          }
          if (proj.github) {
            println("\x1b[1;38;2;6;182;212mGitHub:\x1b[0m");
            println(`\x1b[4;38;2;37;99;235m${proj.github}\x1b[0m`);
          }
          println("");
        });
        break;
      case "whoami":
        println("\x1b[38;2;75;85;99mkuldeep\x1b[0m");
        break;
      case "sudo":
        println(
          "\x1b[31mkuldeep is not in the sudoers file. This incident will be reported.\x1b[0m",
        );
        break;
      default:
        println(`\x1b[31mzsh: command not found: ${baseCmd}\x1b[0m`);
    }

    commandRef.current = "";
    prompt();
  };

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 11,
      lineHeight: 1.4,
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
    setActiveTerm(term);

    const prompt = () => {
      term.write("\r\n\x1b[1;32mkuldeep@macbook ~ %\x1b[0m ");
    };

    const println = (msg) => {
      term.write("\r\n" + msg + "\x1b[0m");
    };

    term.write("Last login: " + new Date().toLocaleString() + " / type help?");
    prompt();

    term.onData((data) => {
      const code = data.charCodeAt(0);

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
            println("\x1b[1;38;2;219;39;119m=== Available Commands ===\x1b[0m");
            println(
              "\x1b[1;38;2;16;185;129mhelp\x1b[0m      \x1b[38;2;75;85;99m- Show help message\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129mclear\x1b[0m     \x1b[38;2;75;85;99m- Clear screen\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129mecho\x1b[0m      \x1b[38;2;75;85;99m- Print text\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129mdate\x1b[0m      \x1b[38;2;75;85;99m- Print date/time\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129mwhoami\x1b[0m    \x1b[38;2;75;85;99m- Print current user\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129mtechstack\x1b[0m \x1b[38;2;75;85;99m- Display tech stack\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129mprojects\x1b[0m  \x1b[38;2;75;85;99m- Display portfolio projects\x1b[0m",
            );
            println(
              "\x1b[1;38;2;16;185;129msudo\x1b[0m      \x1b[38;2;75;85;99m- Run superuser command\x1b[0m",
            );
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
            println("\x1b[38;2;75;85;99mkuldeep\x1b[0m");
            break;
          case "sudo":
            println(
              "\x1b[31mkuldeep is not in the sudoers file. This incident will be reported.\x1b[0m",
            );
            break;
          case "techstack":
            println("\x1b[1;38;2;219;39;119m=== Tech Stack ===\x1b[0m");
            techStack.forEach(({ category, items }) => {
              println(`\x1b[1;38;2;6;182;212m${category}:\x1b[0m`);
              println(`\x1b[38;2;75;85;99m${items.join(", ")}\x1b[0m`);
            });
            break;
          case "projects":
            println("\x1b[1;38;2;219;39;119m=== Portfolio Projects ===\x1b[0m");
            projects.forEach((proj) => {
              println(`\x1b[1;38;2;16;185;129m• ${proj.title}\x1b[0m`);
              println("\x1b[1;38;2;245;158;11mDescription:\x1b[0m");
              println(`\x1b[38;2;75;85;99m${proj.description}\x1b[0m`);
              if (proj.link) {
                println("\x1b[1;38;2;6;182;212mLive Demo:\x1b[0m");
                println(`\x1b[4;38;2;37;99;235m${proj.link}\x1b[0m`);
              }
              if (proj.github) {
                println("\x1b[1;38;2;6;182;212mGitHub:\x1b[0m");
                println(`\x1b[4;38;2;37;99;235m${proj.github}\x1b[0m`);
              }
              println("");
            });
            break;
          default:
            println(`\x1b[31mzsh: command not found: ${baseCmd}\x1b[0m`);
        }

        commandRef.current = "";
        prompt();
      } else if (code === 127 || code === 8) {
        if (commandRef.current.length > 0) {
          commandRef.current = commandRef.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (code >= 32 && code <= 126) {
        commandRef.current += data;
        term.write(data);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      const fit = fitAddonRef.current;
      if (fit) {
        try {
          fit.fit();
        } catch {
          // ignore fit error
        }
      }
    });

    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    const timer = setTimeout(() => {
      const fit = fitAddonRef.current;
      if (fit) {
        try {
          fit.fit();
        } catch {
          // ignore fit error
        }
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      term.dispose();
    };
  }, [commandRef, fitAddonRef, terminalRef, xtermRef]);

  return (
    <div
      className="flex-1 w-full bg-white flex flex-col min-h-0 p-4 pb-2"
      style={{ overflow: "hidden" }}
    >
      <style>{`
        .xterm-viewport {
          scroll-behavior: smooth !important;
          -webkit-overflow-scrolling: touch !important;
        }
      `}</style>
      <div className="flex-1 w-full min-h-0" style={{ overflow: "hidden" }}>
        <div ref={terminalRef} className="w-full h-full outline-none xterm-wrapper" />
      </div>

      {/* Predefined commands horizontal scrolling bar */}
      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          padding: "12px 0 4px",
          borderTop: "1px solid #e5e5ea",
          width: "100%",
          flexShrink: 0,
          background: "#ffffff",
        }}
        className="scrollbar-none"
      >
        {shortcutKeys.map(({ label, cmd }) => (
          <button
            key={label}
            onClick={() => handleShortcutClick(cmd)}
            style={{
              padding: "6px 12px",
              background: "rgba(0, 0, 0, 0.05)",
              color: "#333333",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: 8,
              fontSize: 11,
              fontFamily: "Menlo, Monaco, monospace",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            className="active:bg-black/10"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerminalInput;
