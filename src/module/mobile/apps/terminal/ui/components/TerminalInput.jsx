import { useEffect } from "react";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { techStack, projects } from "@constants";

const TerminalInput = ({ terminalRef, xtermRef, fitAddonRef, commandRef }) => {
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
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

    const prompt = () => {
      term.write("\r\n\x1b[1;32mkuldeep@macbook ~ %\x1b[0m ");
    };

    const println = (msg) => {
      term.write("\r\n\x1b[38;2;37;99;235m" + msg + "\x1b[0m");
    };

    const gradientChar = (char, t) => {
      const colors = [
        [239, 68, 68],
        [249, 115, 22],
        [234, 179, 8],
      ];
      let r, g, b;
      if (t <= 0.5) {
        const f = t / 0.5;
        r = Math.round(colors[0][0] + (colors[1][0] - colors[0][0]) * f);
        g = Math.round(colors[0][1] + (colors[1][1] - colors[0][1]) * f);
        b = Math.round(colors[0][2] + (colors[1][2] - colors[0][2]) * f);
      } else {
        const f = (t - 0.5) / 0.5;
        r = Math.round(colors[1][0] + (colors[2][0] - colors[1][0]) * f);
        g = Math.round(colors[1][1] + (colors[2][1] - colors[1][1]) * f);
        b = Math.round(colors[1][2] + (colors[2][2] - colors[1][2]) * f);
      }
      return `\x1b[38;2;${r};${g};${b}m${char}`;
    };
    const gradientLine = (str) =>
      [...str].map((c, i, a) => gradientChar(c, a.length > 1 ? i / (a.length - 1) : 0)).join("") +
      "\x1b[0m";

    const hulkLines = [
      "██╗  ██╗██╗   ██╗██╗     ██████╗ ███████╗███████╗██████╗ ",
      "██║ ██╔╝██║   ██║██║     ██╔══██╗██╔════╝██╔════╝██╔══██╗",
      "█████╔╝ ██║   ██║██║     ██║  ██║█████╗  █████╗  ██████╔╝",
      "██╔═██╗ ██║   ██║██║     ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ",
      "██║  ██╗╚██████╔╝███████╗██████╔╝███████╗███████╗██║     ",
      "╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚══════╝╚═╝     ",
    ];
    hulkLines.forEach((line) => term.writeln(gradientLine(line)));

    term.write("Last login: " + new Date().toLocaleString() + " / help?");
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
            println("Available commands:");
            println("  help      - Show this help message");
            println("  clear     - Clear the terminal screen");
            println("  echo      - Print text to the terminal");
            println("  date      - Print the current date and time");
            println("  whoami    - Print the current user");
            println("  techstack - Display my tech stack");
            println("  projects  - Display my portfolio projects");
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
            println("=== Tech Stack ===");
            techStack.forEach(({ category, items }) => {
              println(`${category}:`);
              println(`  ${items.join(", ")}`);
            });
            break;
          case "projects":
            println("=== Portfolio Projects ===");
            projects.forEach((proj) => {
              println(`${proj.title}:`);
              println(`  Description: ${proj.description}`);
              if (proj.link) println(`  Live Demo:   ${proj.link}`);
              if (proj.github) println(`  GitHub:      ${proj.github}`);
            });
            break;
          default:
            println(`zsh: command not found: ${baseCmd}`);
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
    // Refs are stable and don't need to be in dependencies, but adding them/ignoring correctly to satisfy ESLint
  }, [commandRef, fitAddonRef, terminalRef, xtermRef]);

  return (
    <div
      ref={terminalRef}
      className="flex-1 w-full bg-white pt-4 px-4 pb-12 outline-none xterm-wrapper"
      style={{ overflow: "hidden" }}
    />
  );
};

export default TerminalInput;
