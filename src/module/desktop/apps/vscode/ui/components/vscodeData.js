export const INITIAL_FILES = {
  "src/App.jsx": `import React from 'react';
import Header from './components/Header';
import Card from './components/Card';

export default function App() {
  return (
    <div className="portfolio min-h-screen bg-[#1e1e1e] text-white">
      <Header title="Kuldeep Rajput" />
      <main className="max-w-4xl mx-auto p-8 grid gap-6">
        <Card title="Projects" desc="Interactive macOS Portfolio & web apps" />
        <Card title="Skills" desc="React, Next.js, Tailwind CSS, Node.js" />
      </main>
    </div>
  );
}`,
  "src/components/Header.jsx": `import React from 'react';

export default function Header({ title }) {
  return (
    <header className="w-full py-6 border-b border-zinc-800 bg-black/20 backdrop-blur-md px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
      <nav className="flex gap-4 text-xs font-semibold text-zinc-400">
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
      </nav>
    </header>
  );
}`,
  "src/components/Card.jsx": `import React from 'react';

export default function Card({ title, desc }) {
  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500 transition-colors shadow-lg">
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}`,
  "src/hooks/useWeather.js": `import { useState, useEffect } from 'react';

export default function useWeather(city = 'Delhi') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch call
    const timer = setTimeout(() => {
      setData({
        temp: 36,
        humidity: 62,
        wind: 12,
        condition: 'Haze'
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [city]);

  return { data, loading };
}`,
  "src/index.css": `:root {
  --primary: #007acc;
  --background: #1e1e1e;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: var(--background);
  color: #f3f3f3;
}`,
  "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vscode: "#007acc"
      }
    }
  },
  plugins: [],
}`,
  "package.json": `{
  "name": "macos-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "next",
    "build": "next build"
  },
  "dependencies": {
    "react": "^19.2.0",
    "tailwindcss": "^4.1.17",
    "lucide-react": "^0.400.0"
  }
}`,
  "jsconfig.json": `{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"]
    }
  }
}`,
  ".env": `NEXT_PUBLIC_GROQ_API_KEY=gsk_mock_key_12345
PORT=3000
NODE_ENV=development`,
  "README.md": `# macOS Portfolio Simulation

This is an interactive macOS desktop portfolio simulation built with React, Vite, Tailwind CSS, and GSAP.

## Features
- Safari browser with interactive search and bookmark tabs
- Fully draggable and resizable windows
- Integrated VS Code editor (you are here!)

## Get Started
Run the dev server:
\`\`\`bash
bun run dev
\`\`\`
`,
};

export const extensionsList = [
  {
    name: "GitHub Copilot",
    desc: "Your AI pair programmer",
    publisher: "GitHub",
    version: "v1.254",
  },
  { name: "Prettier", desc: "Opinionated code formatter", publisher: "Prettier", version: "v10.2" },
  {
    name: "Tailwind CSS IntelliSense",
    desc: "Intelligent Tailwind CSS tooling",
    publisher: "Tailwind Labs",
    version: "v0.11",
  },
  {
    name: "GitLens",
    desc: "Supercharge Git within VS Code",
    publisher: "GitKraken",
    version: "v15.0",
  },
  {
    name: "ESLint",
    desc: "Integrates ESLint into VS Code",
    publisher: "Microsoft",
    version: "v2.4",
  },
  {
    name: "Dracula Theme",
    desc: "A dark theme for many editors",
    publisher: "Dracula",
    version: "v2.24",
  },
];
