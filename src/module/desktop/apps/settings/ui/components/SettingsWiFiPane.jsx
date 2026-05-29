import React, { useState } from "react";
import { Wifi, Lock, Check, Loader2, Info, RefreshCw } from "lucide-react";
import useWindowsStore from "#store/window";

const SettingsWiFiPane = () => {
  const { systemSettings, updateSystemSetting, toggleSystemSetting } = useWindowsStore();
  const { wifi, activeWifiNetwork } = systemSettings;
  const [connectingTo, setConnectingTo] = useState(null);
  
  // Scanning & refreshing states
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [promptingNetwork, setPromptingNetwork] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [networks, setNetworks] = useState([
    { name: "Home Network", locked: true, strength: "strong" },
    { name: "Coffee Shop 5G", locked: true, strength: "medium" },
    { name: "iPhone (Kuldeep)", locked: true, strength: "strong" },
    { name: "Airport Free WiFi", locked: false, strength: "weak" },
  ]);

  const handleToggle = () => {
    toggleSystemSetting("wifi");
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Refresh network list and discover a new mock network
      setNetworks([
        { name: "Home Network", locked: true, strength: "strong" },
        { name: "Coffee Shop 5G", locked: true, strength: "medium" },
        { name: "iPhone (Kuldeep)", locked: true, strength: "strong" },
        { name: "Airport Free WiFi", locked: false, strength: "weak" },
        { name: "Kuldeep's MacBook Hotspot", locked: true, strength: "strong" },
      ]);
    }, 1200);
  };

  const connectToNetwork = (net) => {
    if (connectingTo) return;
    if (net.locked) {
      setPromptingNetwork(net);
      setPasswordInput("");
    } else {
      // Connect instantly if unlocked
      setConnectingTo(net.name);
      setTimeout(() => {
        updateSystemSetting("activeWifiNetwork", net.name);
        setConnectingTo(null);
      }, 1200);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!promptingNetwork) return;
    const targetName = promptingNetwork.name;
    setPromptingNetwork(null);
    setConnectingTo(targetName);
    setTimeout(() => {
      updateSystemSetting("activeWifiNetwork", targetName);
      setConnectingTo(null);
    }, 1200);
  };

  return (
    <div className="w-full relative min-h-[420px]">
      {/* Toggle Wifi Card */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200/80 p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
            wifi ? "bg-[#007aff]" : "bg-gray-400"
          }`}>
            <Wifi size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Wi-Fi</h3>
            <p className="text-[12px] text-gray-500">
              {wifi ? (activeWifiNetwork ? `Connected to ${activeWifiNetwork}` : "On, Not Connected") : "Off"}
            </p>
          </div>
        </div>
        <button 
          onClick={handleToggle}
          className="focus:outline-none"
        >
          {wifi ? (
            <ToggleRightActive size={36} className="text-[#007aff] cursor-pointer" />
          ) : (
            <ToggleRightInactive size={36} className="text-gray-300 cursor-pointer" />
          )}
        </button>
      </div>

      {wifi ? (
        <div className="space-y-6">
          {/* Available Networks */}
          <div>
            <div className="flex items-center justify-between ml-1 mb-2">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Available Networks</h3>
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-[#007aff] disabled:text-gray-300 transition-colors focus:outline-none p-1 rounded hover:bg-gray-100"
              >
                <RefreshCw size={11} className={isRefreshing ? "animate-spin text-[#007aff]" : ""} />
                <span>{isRefreshing ? "Scanning..." : "Scan"}</span>
              </button>
            </div>

            {isRefreshing ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 shadow-sm flex flex-col items-center justify-center">
                <Loader2 size={24} className="animate-spin text-[#007aff] mb-2" />
                <span className="text-[12px] font-semibold text-gray-500">Scanning for networks...</span>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm divide-y divide-gray-150">
                {networks.map((net) => {
                  const isCurrent = activeWifiNetwork === net.name;
                  const isConnecting = connectingTo === net.name;
                  return (
                    <div 
                      key={net.name}
                      onClick={() => !isCurrent && connectToNetwork(net)}
                      className={`flex items-center justify-between p-3.5 px-4 transition-all duration-150 ${
                        isCurrent 
                          ? "bg-blue-50/30" 
                          : "hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wifi size={15} className={isCurrent ? "text-[#007aff]" : "text-gray-600"} />
                        <span className={`text-[13px] font-semibold ${isCurrent ? "text-[#007aff]" : "text-gray-700"}`}>
                          {net.name}
                        </span>
                        {isConnecting && <Loader2 size={13} className="animate-spin text-[#007aff]" />}
                      </div>
                      <div className="flex items-center gap-3">
                        {net.locked && <Lock size={12} className="text-gray-400" />}
                        {isCurrent && <Check size={16} className="text-[#007aff] font-bold" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details section */}
          {activeWifiNetwork && !isRefreshing && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-xs text-gray-600 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-gray-800 text-[13px] border-b border-gray-150 pb-2 mb-2">
                <Info size={14} className="text-[#007aff]" />
                <span>Connection Details</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">IP Address</span>
                <span className="font-mono text-gray-700">192.168.1.142</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Router</span>
                <span className="font-mono text-gray-700">192.168.1.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Security</span>
                <span className="text-gray-700 font-medium">WPA3 Personal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">MAC Address</span>
                <span className="font-mono text-gray-700">f4:5c:89:a2:11:c3</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 shadow-sm">
          <Wifi size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-[13px] font-semibold text-gray-500">Wi-Fi is turned off.</p>
          <p className="text-[11px] text-gray-400 mt-1">Enable Wi-Fi to scan and connect to local wireless networks.</p>
        </div>
      )}

      {/* Password Prompt Modal overlay */}
      {promptingNetwork && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-[#007aff]/10 text-[#007aff] flex items-center justify-center mx-auto mb-3">
              <Wifi size={20} />
            </div>
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">Wi-Fi Password Required</h4>
            <p className="text-[11px] text-gray-500 mt-1 mb-4 font-medium">
              Enter the security password for <br /><strong>&ldquo;{promptingNetwork.name}&rdquo;</strong>
            </p>
            <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
              <input
                type="password"
                placeholder="Password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-1 font-semibold"
                autoFocus
              />
              <div className="flex gap-2 justify-end text-[11px]">
                <button
                  type="button"
                  onClick={() => setPromptingNetwork(null)}
                  className="px-3.5 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#007aff] text-white hover:bg-[#0062cc] font-semibold"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

export default SettingsWiFiPane;
