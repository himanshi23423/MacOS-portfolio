import React from "react";

const SettingsAppearancePane = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-4">Appearance</h3>
    <div className="flex gap-8 mb-8">
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <div className="w-24 h-16 rounded-md bg-gray-100 border-2 border-blue-500 shadow-sm overflow-hidden flex flex-col">
          <div className="h-4 bg-white border-b border-gray-200"></div>
          <div className="flex-1 bg-gray-100 p-1"><div className="w-full h-full bg-white rounded-sm shadow-sm"></div></div>
        </div>
        <span className="text-[12px] font-medium text-gray-900">Light</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
        <div className="w-24 h-16 rounded-md bg-gray-800 border-2 border-transparent shadow-sm overflow-hidden flex flex-col">
          <div className="h-4 bg-[#2c2c2e] border-b border-black"></div>
          <div className="flex-1 bg-[#1e1e1e] p-1"><div className="w-full h-full bg-[#2c2c2e] rounded-sm shadow-sm"></div></div>
        </div>
        <span className="text-[12px] font-medium text-gray-600">Dark</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
        <div className="w-24 h-16 rounded-md bg-gradient-to-r from-gray-100 to-gray-800 border-2 border-transparent shadow-sm overflow-hidden flex flex-col">
          <div className="h-4 flex"><div className="flex-1 bg-white border-b border-gray-200"></div><div className="flex-1 bg-[#2c2c2e] border-b border-black"></div></div>
          <div className="flex-1 flex"><div className="flex-1 bg-gray-100 p-1"><div className="w-full h-full bg-white rounded-sm shadow-sm"></div></div><div className="flex-1 bg-[#1e1e1e] p-1"><div className="w-full h-full bg-[#2c2c2e] rounded-sm shadow-sm"></div></div></div>
        </div>
        <span className="text-[12px] font-medium text-gray-600">Auto</span>
      </div>
    </div>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4">
        <span className="text-[13px] text-gray-900">Allow wallpaper tinting in windows</span>
        <ToggleRight size={24} className="text-blue-500" />
      </div>
    </div>
  </div>
);

const ToggleRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="1" y="5" width="22" height="14" rx="7" />
    <circle cx="16" cy="12" r="5" fill="currentColor" />
  </svg>
);

export default SettingsAppearancePane;
