import { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { 
  Type, 
  Search, 
  Download, 
  Info, 
  Maximize2, 
  Sliders, 
  Plus,
  Compass,
  Smile
} from "lucide-react";

// Preset system and web fonts loaded out of the box
const INITIAL_FONTS = [
  { name: "Inter", category: "Sans-Serif", designer: "Rasmus Andersson", desc: "A typeface carefully crafted & designed for computer screens." },
  { name: "Roboto", category: "Sans-Serif", designer: "Christian Robertson", desc: "Dual nature. It has a mechanical skeleton and the forms are largely geometric." },
  { name: "Playfair Display", category: "Serif", designer: "Claus Eggers Sørensen", desc: "An elegant serif suitable for titles, inspired by John Baskerville's designs." },
  { name: "Outfit", category: "Sans-Serif", designer: "Outfit Studio", desc: "A geometric sans-serif typeface designed for digital screen readability." },
  { name: "Pacifico", category: "Handwriting", designer: "Vernon Adams", desc: "An original and fun brush script handwriting font inspired by American surf culture." },
  { name: "Courier New", category: "Monospaced", designer: "Howard Kettler", desc: "Classic monospaced typewriter font, perfect for technical terminal and code displays." },
  { name: "Press Start 2P", category: "Retro/Display", designer: "Cody Boisclair", desc: "A pixelated display font based on classic 1980s arcade game typography." },
  { name: "Great Vibes", category: "Handwriting", designer: "TypeSETit", desc: "A beautifully flowing, elegant script handwriting font with soft, looping ascenders." }
];

const FontBook = () => {
  const [activeCategory, setActiveCategory] = useState("All Fonts");
  const [fonts, setFonts] = useState(INITIAL_FONTS);
  const [activeFont, setActiveFont] = useState(INITIAL_FONTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(36);
  
  // Custom font installer state
  const [googleFontInput, setGoogleFontInput] = useState("");
  const [specimenText, setSpecimenText] = useState(
    "The quick brown fox jumps over the lazy dog.\nAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz\n1234567890"
  );
  
  // Style toggles
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  // Dynamic Google Font Installer logic
  const handleInstallFont = () => {
    const name = googleFontInput.trim();
    if (!name) return;

    // Check if already installed
    if (fonts.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      alert("This font is already loaded in Font Book!");
      return;
    }

    // Format font family name for API request URL
    const formattedName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const googleFontUrlName = formattedName.replace(/ /g, "+");

    // Load Google Font stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${googleFontUrlName}&display=swap`;
    
    // Listen for load errors
    link.onerror = () => {
      alert(`Could not load font "${formattedName}" from Google Fonts. Please verify the family name.`);
    };

    document.head.appendChild(link);

    // Add to state list
    const newFont = {
      name: formattedName,
      category: "Google Fonts",
      designer: "Google Fonts Contributor",
      desc: "Dynamically installed web font loaded directly via Google Fonts API."
    };

    setFonts(prev => [...prev, newFont]);
    setActiveFont(newFont);
    setGoogleFontInput("");
  };

  // Filter fonts by search and category
  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Fonts" || font.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800 font-sans select-none rounded-xl overflow-hidden shadow-2xl border border-zinc-200/80">
      
      {/* Title Bar Header */}
      <div id="window-header" className="shrink-0 bg-[#f3f3f3] border-b border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <WindowControls target="font" />
          <span className="font-semibold pl-4 hidden md:flex items-center gap-1.5">
            <Type size={14} className="text-indigo-600" /> Font Book
          </span>
        </div>

        {/* Top Search bar */}
        <div className="w-64 max-w-xs relative flex items-center">
          <input 
            type="text"
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-zinc-300 rounded-lg pl-8 pr-3 py-1 text-xs text-gray-800 outline-none focus:border-indigo-500 shadow-inner select-text"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="w-16 flex justify-end">
          <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded font-bold">FONTS</span>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* Left Sidebar categories */}
        <div className="w-48 bg-[#f8f9fa] border-r border-zinc-200 flex flex-col shrink-0 min-w-0">
          <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-zinc-200">
            Collections
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            {["All Fonts", "Sans-Serif", "Serif", "Monospaced", "Handwriting", "Retro/Display", "Google Fonts"].map(cat => {
              const count = cat === "All Fonts" ? fonts.length : fonts.filter(f => f.category === cat).length;
              return (
                <div 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg cursor-pointer text-xs transition-colors ${
                    activeCategory === cat ? "bg-indigo-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-200/60"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-indigo-700 text-indigo-100" : "bg-zinc-200 text-zinc-500"}`}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Google Fonts Installer HUD in Sidebar */}
          <div className="p-3 border-t border-zinc-200 bg-gray-50">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">Load Google Font</span>
            <div className="flex gap-1.5 items-center">
              <input 
                type="text"
                placeholder="e.g. Lobster"
                value={googleFontInput}
                onChange={(e) => setGoogleFontInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInstallFont();
                }}
                className="flex-1 min-w-0 bg-white border border-zinc-300 rounded px-2 py-1 text-[11px] text-gray-800 outline-none focus:border-indigo-500 select-text"
              />
              <button 
                onClick={handleInstallFont}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white p-1 rounded transition-colors active:scale-95 cursor-pointer"
                title="Install Font"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column Fonts List */}
        <div className="w-52 border-r border-zinc-200 flex flex-col shrink-0 min-w-0 bg-white">
          <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-zinc-200">
            Fonts list ({filteredFonts.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
            {filteredFonts.map(font => {
              const isActive = activeFont?.name === font.name;
              return (
                <div 
                  key={font.name}
                  onClick={() => setActiveFont(font)}
                  className={`p-3 cursor-pointer text-xs transition-colors truncate ${
                    isActive ? "bg-indigo-50 text-indigo-700 font-bold border-l-4 border-indigo-500" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={{ fontFamily: font.name }}
                >
                  {font.name}
                </div>
              );
            })}
            {filteredFonts.length === 0 && (
              <div className="text-xs text-gray-400 italic text-center py-6">No fonts found</div>
            )}
          </div>
        </div>

        {/* Right Preview Specimen Board */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          
          {/* Specimen Header Controls */}
          <div className="p-4 border-b border-zinc-200 bg-gray-50/50 flex flex-wrap gap-4 items-center justify-between shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">{activeFont?.name}</h2>
              <p className="text-[10px] text-gray-500 mt-0.5">Designed by {activeFont?.designer} • {activeFont?.category}</p>
            </div>

            {/* Layout control bar */}
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
              
              {/* Font style buttons */}
              <div className="flex bg-zinc-200 p-0.5 rounded-lg">
                <button 
                  onClick={() => setIsBold(!isBold)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${isBold ? "bg-white text-gray-900 shadow-sm font-bold" : "hover:text-gray-900"}`}
                >
                  B
                </button>
                <button 
                  onClick={() => setIsItalic(!isItalic)}
                  className={`px-2.5 py-1 rounded-md transition-all italic cursor-pointer ${isItalic ? "bg-white text-gray-900 shadow-sm font-bold" : "hover:text-gray-900"}`}
                >
                  I
                </button>
              </div>

              {/* Slider for FontSize */}
              <div className="flex items-center gap-2">
                <Sliders size={13} className="text-gray-400" />
                <input 
                  type="range"
                  min="12"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-24 accent-indigo-600 cursor-pointer"
                />
                <span className="w-8 text-right font-mono text-[11px] text-gray-500">{fontSize}px</span>
              </div>

            </div>
          </div>

          {/* Specimen Board Text Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <textarea 
              value={specimenText}
              onChange={(e) => setSpecimenText(e.target.value)}
              placeholder="Type custom text here to preview..."
              className="w-full h-full bg-transparent border-none outline-none resize-none select-text leading-relaxed placeholder-gray-300"
              style={{
                fontFamily: activeFont?.name || "inherit",
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal"
              }}
              spellCheck="false"
            />
          </div>

          {/* Font Info Metadata Box */}
          <div className="p-4 border-t border-zinc-200 bg-gray-50/50 text-[11px] text-gray-600 flex items-start gap-2.5 shrink-0 select-none">
            <Info size={14} className="text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-700 block">About {activeFont?.name}</span>
              <p className="leading-relaxed mt-0.5">{activeFont?.desc}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

const FontBookWindow = windowWrapper(FontBook, "font");
export default FontBookWindow;
