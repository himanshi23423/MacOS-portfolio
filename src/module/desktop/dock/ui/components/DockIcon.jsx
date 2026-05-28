const scaleMap = {
  finder: "scale-[0.90]",
  launchpad: "scale-[0.90]",
  safari: "scale-[0.90]",
  photos: "scale-[0.90]",
  contact: "scale-[0.90]",
  terminal: "scale-[0.90]",
  settings: "scale-[0.83]",
  calculator: "scale-[0.83]",
  notes: "scale-[0.90]",
  messages: "scale-[0.90]",
  appletv: "scale-[0.80]",
  call: "scale-[0.71]",
  appstore: "scale-[0.90]",
  weather: "scale-[0.81]",
  chrome: "scale-[0.95]",
  vscode: "scale-[0.95]",
  postman: "scale-[0.95]",
  map: "scale-[0.72]",
  font: "scale-[3]",
  telegram: "scale-[0.90]",
  music: "scale-[0.90]",
  folder: "scale-[0.90]",
  trash: "scale-[0.80]",
};

const CalendarIcon = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today = new Date();
  return (
    <div className="w-full h-full bg-white rounded-[13px] border border-black/10 shadow-sm overflow-hidden flex flex-col items-center select-none scale-[0.76] relative aspect-square transition-all duration-200 hover:scale-[0.82]">
      <div className="w-full bg-[#ff3b30] text-white text-[9px] font-extrabold py-0.5 text-center leading-none tracking-wider uppercase">
        {days[today.getDay()]}
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-855 font-bold text-2xl leading-none font-sans -mt-0.5">
        {today.getDate()}
      </div>
    </div>
  );
};

const DockIcon = ({ app, isHovered, onMouseEnter, onMouseLeave, onClick }) => {
  const { id, name, icon, canOpen } = app;

  return (
    <div className="relative flex justify-center">
      <button
        type="button"
        className="dock-icon relative flex justify-center items-center overflow-visible"
        aria-label={name}
        disabled={!canOpen}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isHovered && (
          <span className="dock-tooltip-custom animate-tooltip">
            {name}
          </span>
        )}
        <span className="size-full flex items-center justify-center overflow-hidden">
          {id === "calendar" ? (
            <CalendarIcon />
          ) : (
            <img
              src={`/images/${icon}`}
              alt={name}
              loading="lazy"
              className={`${canOpen ? "" : "opacity-60"} ${scaleMap[id] || ""} pointer-events-none`}
            />
          )}
        </span>
      </button>
    </div>
  );
};

export default DockIcon;
