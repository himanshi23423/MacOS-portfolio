import React from "react";

// VS Code Seti-style file type icon component
// Colors and shapes match the default macOS VS Code icon theme

const iconMap = {
  jsx: { color: "#61dafb", label: "R", bg: "#20232a" }, // React cyan
  tsx: { color: "#3178c6", label: "TS", bg: "#e8f4fd" }, // TypeScript blue
  js: { color: "#f7df1e", label: "JS", bg: "#323330" }, // JavaScript yellow
  ts: { color: "#3178c6", label: "TS", bg: "#e8f4fd" }, // TypeScript blue
  css: { color: "#1572b6", label: "#", bg: "#e8f0fe" }, // CSS blue
  json: { color: "#f5a623", label: "{}", bg: "#fef6e6" }, // JSON gold
  md: { color: "#519aba", label: "M↓", bg: "#e8f4fd" }, // Markdown blue
  html: { color: "#e44d26", label: "<>", bg: "#fce8e6" }, // HTML orange
  py: { color: "#3572a5", label: "Py", bg: "#e8f0fe" }, // Python blue
  env: { color: "#ecd53f", label: "⚙", bg: "#fef6e6" }, // Env yellow
  svg: { color: "#ffb13b", label: "◇", bg: "#fef6e6" }, // SVG amber
  gitignore: { color: "#f05032", label: "G", bg: "#fce8e6" },
};

// Folder icon SVG matching VS Code Seti theme
export const FolderIcon = ({ isOpen = false, size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {isOpen ? (
      <>
        <path
          d="M1.5 3C1.5 2.44772 1.94772 2 2.5 2H6L7.5 3.5H13.5C14.0523 3.5 14.5 3.94772 14.5 4.5V5H3L1.5 12V3Z"
          fill="#dcb67a"
        />
        <path d="M2.5 5.5H14L12.5 12.5H1L2.5 5.5Z" fill="#e8c97a" />
      </>
    ) : (
      <path
        d="M1.5 3C1.5 2.44772 1.94772 2 2.5 2H6L7.5 3.5H13.5C14.0523 3.5 14.5 3.94772 14.5 4.5V12C14.5 12.5523 14.0523 13 13.5 13H2.5C1.94772 13 1.5 12.5523 1.5 12V3Z"
        fill="#dcb67a"
      />
    )}
  </svg>
);

// React logo icon (simplified atom shape)
const ReactIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="1.5" fill="#61dafb" />
    <ellipse cx="8" cy="8" rx="6.5" ry="2.5" stroke="#61dafb" strokeWidth="0.8" fill="none" />
    <ellipse
      cx="8"
      cy="8"
      rx="6.5"
      ry="2.5"
      stroke="#61dafb"
      strokeWidth="0.8"
      fill="none"
      transform="rotate(60 8 8)"
    />
    <ellipse
      cx="8"
      cy="8"
      rx="6.5"
      ry="2.5"
      stroke="#61dafb"
      strokeWidth="0.8"
      fill="none"
      transform="rotate(120 8 8)"
    />
  </svg>
);

// JavaScript file icon
const JSIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#f7df1e" />
    <text
      x="8"
      y="12"
      textAnchor="middle"
      fill="#323330"
      fontSize="8"
      fontWeight="bold"
      fontFamily="monospace"
    >
      JS
    </text>
  </svg>
);

// TypeScript file icon
const TSIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#3178c6" />
    <text
      x="8"
      y="12"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="8"
      fontWeight="bold"
      fontFamily="monospace"
    >
      TS
    </text>
  </svg>
);

// CSS file icon
const CSSIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#1572b6" />
    <text
      x="8"
      y="11.5"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="6.5"
      fontWeight="bold"
      fontFamily="monospace"
    >
      {"{}"}
    </text>
  </svg>
);

// JSON file icon
const JSONIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#f5a623" />
    <text
      x="8"
      y="11.5"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="6.5"
      fontWeight="bold"
      fontFamily="monospace"
    >
      {"{}"}
    </text>
  </svg>
);

// Markdown file icon
const MDIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#519aba" />
    <text
      x="8"
      y="12"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="8"
      fontWeight="bold"
      fontFamily="monospace"
    >
      M
    </text>
  </svg>
);

// Env file icon (gear)
const EnvIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#ecd53f" />
    <circle cx="8" cy="8" r="2.5" stroke="#323330" strokeWidth="1.2" fill="none" />
    <circle cx="8" cy="8" r="0.8" fill="#323330" />
  </svg>
);

// Config file icon
const ConfigIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#8b8b8b" />
    <path
      d="M8 4L10.5 6L10.5 10L8 12L5.5 10L5.5 6L8 4Z"
      stroke="#ffffff"
      strokeWidth="1"
      fill="none"
    />
    <circle cx="8" cy="8" r="1.2" fill="#ffffff" />
  </svg>
);

// Generic file icon
const GenericIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 1.5H10L13 4.5V14.5H3V1.5Z" fill="#c5c5c5" stroke="#999999" strokeWidth="0.5" />
    <path d="M10 1.5V4.5H13" stroke="#999999" strokeWidth="0.5" fill="#e0e0e0" />
    <line x1="5" y1="7" x2="11" y2="7" stroke="#999999" strokeWidth="0.5" />
    <line x1="5" y1="9" x2="11" y2="9" stroke="#999999" strokeWidth="0.5" />
    <line x1="5" y1="11" x2="9" y2="11" stroke="#999999" strokeWidth="0.5" />
  </svg>
);

const VSCodeFileIcon = ({ filename, size = 14 }) => {
  if (!filename) return <GenericIcon size={size} />;

  const name = filename.toLowerCase();
  const ext = name.split(".").pop();

  // Special full-name matches
  if (name === ".env" || name.startsWith(".env.")) return <EnvIcon size={size} />;
  if (name === ".gitignore") return <ConfigIcon size={size} />;
  if (name.includes("config")) return <ConfigIcon size={size} />;
  if (name === "jsconfig.json" || name === "tsconfig.json") return <ConfigIcon size={size} />;

  // Extension-based matches
  switch (ext) {
    case "jsx":
    case "tsx":
      return <ReactIcon size={size} />;
    case "js":
      return <JSIcon size={size} />;
    case "ts":
      return <TSIcon size={size} />;
    case "css":
    case "scss":
    case "less":
      return <CSSIcon size={size} />;
    case "json":
      return <JSONIcon size={size} />;
    case "md":
    case "mdx":
      return <MDIcon size={size} />;
    case "html":
      return <GenericIcon size={size} />;
    default:
      return <GenericIcon size={size} />;
  }
};

export default VSCodeFileIcon;
