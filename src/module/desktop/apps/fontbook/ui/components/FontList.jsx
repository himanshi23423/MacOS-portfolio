const FontList = ({ filteredFonts, activeFont, setActiveFont }) => (
  <div className="w-52 border-r border-zinc-200 flex flex-col shrink-0 min-w-0 bg-white">
    <div className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 border-b border-zinc-200">
      Fonts list ({filteredFonts.length})
    </div>
    <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
      {filteredFonts.map((font) => {
        const isActive = activeFont?.name === font.name;
        return (
          <div
            key={font.name}
            onClick={() => setActiveFont(font)}
            className={`p-3 cursor-pointer text-xs transition-colors truncate ${
              isActive
                ? "bg-indigo-50 text-indigo-700 font-bold border-l-4 border-indigo-500"
                : "text-gray-700 hover:bg-gray-100"
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
);

export default FontList;
