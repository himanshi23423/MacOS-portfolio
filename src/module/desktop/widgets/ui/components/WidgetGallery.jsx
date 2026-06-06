import useWidgetsStore from "@store/widgets";

const WIDGET_TEMPLATES = [
  {
    type: "clock-cal",
    name: "Time & Calendar",
    size: "large",
    desc: "Combined digital clock & monthly grid",
    icon: "🗓️",
  },
];

const WidgetGallery = () => {
  const { isEditMode, setEditMode, addWidget } = useWidgetsStore();

  return (
    <>
      {/* Floating Toggle Button to Edit Widgets */}
      {!isEditMode && (
        <button onClick={() => setEditMode(true)} className="widget-gallery-btn">
          <span>✨</span> Edit Widgets
        </button>
      )}

      {/* Slide-up Widget Gallery Drawer */}
      <div className={`widget-gallery-drawer ${isEditMode ? "open" : ""}`}>
        <div className="flex justify-between items-center px-8 py-3.5 border-b border-white/10 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-white text-base font-bold">Widgets Gallery</h2>
            <p className="text-gray-400 text-xs mt-0.5">Customise your macOS Desktop Layout</p>
          </div>
          <button
            onClick={() => setEditMode(false)}
            className="bg-white text-black hover:bg-gray-100 rounded-full px-5 py-1.5 text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

        {/* Gallery Scroll Container */}
        <div className="flex-1 flex gap-5 overflow-x-auto px-8 py-4 items-center scrollbar-thin">
          {WIDGET_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.type}
              className="w-52 h-[130px] rounded-xl bg-white/5 border border-white/10 hover:border-white/20 p-3.5 flex flex-col justify-between shrink-0 hover:bg-white/10 transition-all select-none group"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{tmpl.icon}</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-xs font-bold truncate">{tmpl.name}</span>
                  <span className="text-[10px] text-gray-400 mt-0.5 leading-tight line-clamp-2">
                    {tmpl.desc}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-[9px] text-gray-500 font-bold uppercase">{tmpl.size}</span>
                <button
                  onClick={() => addWidget(tmpl.type, tmpl.size)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-full px-3.5 py-1 transition-all cursor-pointer shadow-md hover:scale-[1.03]"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WidgetGallery;
export { WidgetGallery };
