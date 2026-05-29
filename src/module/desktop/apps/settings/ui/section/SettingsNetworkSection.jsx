import React from "react";
import { Shield, Wifi, Info, ShieldAlert } from "lucide-react";
import useWindowsStore from "#store/window";

const SettingsNetworkSection = () => {
  const { systemSettings, toggleSystemSetting } = useWindowsStore();
  const { wifi, activeWifiNetwork, firewall } = systemSettings;

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">Network Interfaces</h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6 divide-y divide-gray-150">
        
        {/* Wi-Fi interface (Dynamic) */}
        <div className="flex items-center justify-between p-3.5 px-4">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              wifi ? (activeWifiNetwork ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-yellow-500") : "bg-gray-300"
            }`} />
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-gray-900">Wi-Fi</span>
              {wifi && activeWifiNetwork && (
                <span className="text-[10px] text-gray-400 font-semibold">{activeWifiNetwork}</span>
              )}
            </div>
          </div>
          <span className="text-[12px] font-medium text-gray-500">
            {wifi ? (activeWifiNetwork ? "Connected" : "Not Connected") : "Inactive"}
          </span>
        </div>

        {/* Thunderbolt Bridge */}
        <div className="flex items-center justify-between p-3.5 px-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="text-[13px] font-semibold text-gray-700">Thunderbolt Bridge</span>
          </div>
          <span className="text-[12px] font-medium text-gray-500">Not Connected</span>
        </div>

        {/* VPN */}
        <div className="flex items-center justify-between p-3.5 px-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="text-[13px] font-semibold text-gray-700">VPN</span>
          </div>
          <span className="text-[12px] font-medium text-gray-500">Not Configured</span>
        </div>
      </div>

      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">Security</h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-150 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${firewall ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"}`}>
              {firewall ? <Shield size={18} /> : <ShieldAlert size={18} />}
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block">Firewall</span>
              <span className="text-[11px] text-gray-400 font-semibold block">
                {firewall ? "Block incoming connections" : "Firewall disabled"}
              </span>
            </div>
          </div>
          <button 
            onClick={() => toggleSystemSetting("firewall")}
            className="focus:outline-none"
          >
            {firewall ? (
              <ToggleRightActive size={36} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={36} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>

        <div className="text-[11.5px] text-gray-500 leading-relaxed font-medium">
          {firewall ? (
            <p className="flex items-start gap-1 text-green-700/80 bg-green-50/40 p-2.5 rounded-lg border border-green-200/50">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>Firewall is enabled and active. Your Mac is preventing unauthorized applications and services from accepting incoming connections.</span>
            </p>
          ) : (
            <p className="flex items-start gap-1 text-red-700/80 bg-red-50/45 p-2.5 rounded-lg border border-red-200/50">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>Warning: The firewall is turned off. Your computer is unprotected from unauthorized incoming connection attempts.</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ToggleRightActive = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="1" y="5" width="22" height="14" rx="7" fill="currentColor" fillOpacity="0.15" />
    <circle cx="16" cy="12" r="5" fill="currentColor" />
  </svg>
);

const ToggleRightInactive = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="1" y="5" width="22" height="14" rx="7" fill="none" stroke="currentColor" />
    <circle cx="8" cy="12" r="5" fill="currentColor" />
  </svg>
);

export default SettingsNetworkSection;
