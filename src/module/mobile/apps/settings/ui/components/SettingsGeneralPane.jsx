import React from "react";
import { Monitor } from "lucide-react";

const SettingsGeneralPane = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="flex flex-col items-center mb-8">
      <Monitor size={64} className="text-blue-500 mb-4 drop-shadow-md" />
      <h2 className="text-[26px] font-semibold text-gray-900 tracking-tight">macOS Ventura</h2>
      <p className="text-[14px] text-gray-500 mt-1">Version 13.5.2</p>
    </div>

    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] text-gray-700">MacBook Pro</span>
        <span className="text-[13px] font-medium text-gray-900">14-inch, 2023</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] text-gray-700">Chip</span>
        <span className="text-[13px] font-medium text-gray-900">Apple M2 Pro</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] text-gray-700">Memory</span>
        <span className="text-[13px] font-medium text-gray-900">16 GB</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] text-gray-700">Startup Disk</span>
        <span className="text-[13px] font-medium text-gray-900">Macintosh HD</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] text-gray-700">Serial Number</span>
        <span className="text-[13px] font-medium text-gray-900">C02X20YZJHD3</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <span className="text-[13px] text-gray-700">macOS</span>
        <span className="text-[13px] font-medium text-gray-900">13.5.2 (22G91)</span>
      </div>
    </div>
  </div>
);

export default SettingsGeneralPane;
