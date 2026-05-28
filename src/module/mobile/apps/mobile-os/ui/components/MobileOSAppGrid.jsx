const MobileOSAppGrid = ({ dockApps, openWindow }) => {
  const pageCount = 1;

  return (
    <section className="absolute inset-0 overflow-y-auto pt-[64px] pb-[120px]">
      <div className="grid grid-cols-4 px-5 gap-y-7 gap-x-3">
        {dockApps.map((app) => (
          <button
            key={app.id}
            disabled={!app.canOpen}
            onClick={() => app.canOpen && openWindow(app.id)}
            className="flex flex-col items-center gap-[6px] active:scale-[0.85] transition-transform duration-150"
          >
            <div
              className="overflow-hidden w-[62px] h-[62px] rounded-[15px]"
              style={{
                boxShadow: app.canOpen
                  ? "0 2px 8px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(255,255,255,0.08)"
                  : "none",
                opacity: app.canOpen ? 1 : 0.4,
                background: app.canOpen
                  ? "transparent"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              {app.id === "calendar" ? (
                <div className="w-full h-full bg-white flex flex-col items-center justify-between select-none relative pb-1">
                  <div className="text-[#ff3b30] text-[9px] font-bold mt-1 uppercase tracking-tight leading-none">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]}
                  </div>
                  <div className="text-gray-900 font-semibold text-3xl leading-none -mt-1 font-sans">
                    {new Date().getDate()}
                  </div>
                </div>
              ) : (
                <img
                  src={`/images/${app.icon}`}
                  alt={app.name}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              )}
            </div>
            <span className="text-[11px] font-medium text-center text-white leading-tight max-w-[72px] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center gap-[6px] mt-4">
          {Array.from({ length: pageCount }).map((_, i) => (
            <div
              key={i}
              className="h-[7px] rounded-[4px] transition-all duration-250 ease-out"
              style={{
                width: i === 0 ? 18 : 7,
                background:
                  i === 0
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MobileOSAppGrid;
