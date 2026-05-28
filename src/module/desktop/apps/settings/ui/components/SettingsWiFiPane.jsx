import React from "react";
import { Wifi, Lock, Check } from "lucide-react";

const SettingsWiFiPane = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <Wifi size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Wi-Fi</h3>
          <p className="text-[12px] text-gray-500">Home Network</p>
        </div>
      </div>
      <ToggleRight size={36} className="text-blue-500 cursor-pointer" />
    </div>
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Known Networks</h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-gray-800"/>
          <span className="text-[13px] font-medium text-gray-900">Home Network</span>
        </div>
        <Check size={16} className="text-blue-500" />
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-gray-800"/>
          <span className="text-[13px] text-gray-700">Coffee Shop 5G</span>
        </div>
        <Lock size={14} className="text-gray-400" />
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-gray-800"/>
          <span className="text-[13px] text-gray-700">iPhone (Kuldeep)</span>
        </div>
        <Lock size={14} className="text-gray-400" />
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

export default SettingsWiFiPane;
