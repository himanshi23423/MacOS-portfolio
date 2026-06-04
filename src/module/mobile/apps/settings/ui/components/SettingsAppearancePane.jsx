import React from "react";
import useWindowsStore from "@store/window";

const SettingsAppearancePane = () => {
  const { systemSettings, updateSystemSetting } = useWindowsStore();
  const { darkMode } = systemSettings;
  const [automaticMode, setAutomaticMode] = React.useState(false);

  return (
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-4">
          Appearance
        </h3>

        {/* iOS style theme options grid */}
        <div className="flex justify-around bg-white rounded-2xl border border-black/5 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Light Mode option */}
          <div
            onClick={() => updateSystemSetting("darkMode", false)}
            className="flex flex-col items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-[85px] h-[105px] rounded-xl bg-zinc-100 border-2 overflow-hidden flex flex-col transition-all ${
                !darkMode
                  ? "border-blue-500 ring-2 ring-blue-500/10 scale-102"
                  : "border-zinc-250 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="h-5 bg-white border-b border-zinc-200" />
              <div className="flex-1 p-2 flex flex-col gap-1.5">
                <div className="w-full h-2.5 bg-white rounded-sm shadow-sm" />
                <div className="w-4/5 h-2 bg-white rounded-sm shadow-sm" />
              </div>
            </div>
            <span
              className={`text-xs ${!darkMode ? "font-bold text-blue-500" : "font-semibold text-gray-500"}`}
            >
              Light
            </span>
          </div>

          {/* Dark Mode option */}
          <div
            onClick={() => updateSystemSetting("darkMode", true)}
            className="flex flex-col items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-[85px] h-[105px] rounded-xl bg-zinc-900 border-2 overflow-hidden flex flex-col transition-all ${
                darkMode
                  ? "border-blue-500 ring-2 ring-blue-500/10 scale-102"
                  : "border-zinc-200 opacity-65 hover:opacity-100"
              }`}
            >
              <div className="h-5 bg-zinc-800 border-b border-zinc-950" />
              <div className="flex-1 p-2 flex flex-col gap-1.5">
                <div className="w-full h-2.5 bg-zinc-850 rounded-sm shadow-sm" />
                <div className="w-4/5 h-2 bg-zinc-850 rounded-sm shadow-sm" />
              </div>
            </div>
            <span
              className={`text-xs ${darkMode ? "font-bold text-blue-500" : "font-semibold text-gray-500"}`}
            >
              Dark
            </span>
          </div>
        </div>
      </div>

      {/* Auto Switcher Option */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
        <div className="flex items-center justify-between p-3.5 pl-4">
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-gray-800 leading-tight">Automatic</span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              Switch appearance based on local time
            </span>
          </div>
          <button
            onClick={() => setAutomaticMode(!automaticMode)}
            className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
              automaticMode ? "bg-blue-500" : "bg-zinc-200"
            }`}
          >
            <div
              className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                automaticMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAppearancePane;
