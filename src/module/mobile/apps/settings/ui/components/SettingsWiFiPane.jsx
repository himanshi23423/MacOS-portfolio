import React, { useState } from "react";
import { Wifi, Lock, Check, Loader2, Info, RefreshCw } from "lucide-react";
import useWindowsStore from "@store/window";

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
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[420px]">
      {/* iOS style main toggle switch */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 transition-colors ${
              wifi ? "bg-blue-500" : "bg-zinc-400"
            }`}
          >
            <Wifi size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Wi-Fi</h3>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {wifi
                ? activeWifiNetwork
                  ? `Connected to ${activeWifiNetwork}`
                  : "On, Not Connected"
                : "Off"}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
            wifi ? "bg-blue-500" : "bg-zinc-200"
          }`}
        >
          <div
            className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
              wifi ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {wifi ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Available Networks List */}
          <div>
            <div className="flex items-center justify-between ml-3 mb-2">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                Available Networks
              </h3>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-colors focus:outline-none bg-transparent border-none cursor-pointer mr-[10px]"
              >
                <RefreshCw size={11} className={isRefreshing ? "animate-spin text-blue-500" : ""} />
                <span>{isRefreshing ? "Scanning..." : "Scan"}</span>
              </button>
            </div>

            {isRefreshing ? (
              <div className="bg-white border border-black/5 rounded-2xl p-8 text-center text-gray-400 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center">
                <Loader2 size={24} className="animate-spin text-blue-500 mb-2" />
                <span className="text-[13px] font-semibold text-gray-500">
                  Scanning for networks...
                </span>
              </div>
            ) : (
              <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
                {networks.map((net) => {
                  const isCurrent = activeWifiNetwork === net.name;
                  const isConnecting = connectingTo === net.name;
                  return (
                    <div
                      key={net.name}
                      onClick={() => !isCurrent && connectToNetwork(net)}
                      className={`flex items-center justify-between p-3.5 pl-4 transition-all duration-150 ${
                        isCurrent ? "bg-blue-50/10" : "hover:bg-zinc-50 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wifi size={15} className={isCurrent ? "text-blue-500" : "text-gray-450"} />
                        <span
                          className={`text-[15px] font-semibold ${isCurrent ? "text-blue-500" : "text-gray-800"}`}
                        >
                          {net.name}
                        </span>
                        {isConnecting && (
                          <Loader2 size={13} className="animate-spin text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {net.locked && <Lock size={12} className="text-gray-300" />}
                        {isCurrent && (
                          <Check size={16} className="text-blue-500 font-bold" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Connection Details Section */}
          {activeWifiNetwork && !isRefreshing && (
            <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-xs text-gray-600 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-gray-800 text-[13px] border-b border-zinc-100 pb-2 mb-2">
                <Info size={14} className="text-blue-500" />
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
                <span className="text-gray-700 font-semibold">WPA3 Personal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">MAC Address</span>
                <span className="font-mono text-gray-700">f4:5c:89:a2:11:c3</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Wifi size={32} className="mx-auto mb-3 text-zinc-300" />
          <p className="text-sm text-gray-500">Wi-Fi is turned off.</p>
          <p className="text-[11px] text-gray-450 mt-1">
            Enable Wi-Fi to scan and connect to local wireless networks.
          </p>
        </div>
      )}

      {/* Password Prompt Modal overlay */}
      {promptingNetwork && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/5 rounded-3xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3">
              <Wifi size={20} />
            </div>
            <h4 className="text-[16px] font-bold text-gray-900 leading-tight">
              Wi-Fi Password Required
            </h4>
            <p className="text-[12px] text-gray-500 mt-1 mb-4">
              Enter the security password for <br />
              <strong>&ldquo;{promptingNetwork.name}&rdquo;</strong>
            </p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-1"
                autoFocus
              />
              <div className="flex gap-2.5 justify-end text-xs">
                <button
                  type="button"
                  onClick={() => setPromptingNetwork(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold cursor-pointer border-none"
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

export default SettingsWiFiPane;
