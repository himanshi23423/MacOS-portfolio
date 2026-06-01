import React, { useState } from "react";
import { Shield, Wifi, Info, ShieldAlert, Loader2, Cable, Network, Key } from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsNetworkSection = () => {
  const { systemSettings, toggleSystemSetting, updateSystemSetting } = useWindowsStore();
  const { wifi, activeWifiNetwork, firewall, thunderbolt, vpn, vpnConfig } = systemSettings;

  // Loading states
  const [connectingInterface, setConnectingInterface] = useState(null); // 'thunderbolt' or 'vpn'

  // Prompt/modal states
  const [promptType, setPromptType] = useState(null); // 'thunderbolt', 'vpn_config', 'vpn_connect'

  // VPN configuration form states
  const [vpnServer, setVpnServer] = useState("");
  const [vpnAccount, setVpnAccount] = useState("");
  const [vpnPassword, setVpnPassword] = useState("");

  const handleInterfaceClick = (type) => {
    if (connectingInterface) return;

    if (type === "thunderbolt") {
      if (thunderbolt) {
        // Disconnect immediately
        updateSystemSetting("thunderbolt", false);
      } else {
        // Prompt to connect
        setPromptType("thunderbolt");
      }
    } else if (type === "vpn") {
      if (vpn) {
        // Disconnect immediately
        updateSystemSetting("vpn", false);
      } else if (!vpnConfig) {
        // Ask to configure first
        setPromptType("vpn_config");
        setVpnServer("");
        setVpnAccount("");
        setVpnPassword("");
      } else {
        // Already configured, prompt to connect
        setPromptType("vpn_connect");
      }
    }
  };

  const connectThunderbolt = () => {
    setPromptType(null);
    setConnectingInterface("thunderbolt");
    setTimeout(() => {
      updateSystemSetting("thunderbolt", true);
      setConnectingInterface(null);
    }, 1200);
  };

  const saveAndConnectVpn = (e) => {
    e.preventDefault();
    setPromptType(null);
    setConnectingInterface("vpn");
    setTimeout(() => {
      updateSystemSetting("vpnConfig", { server: vpnServer, account: vpnAccount });
      updateSystemSetting("vpn", true);
      setConnectingInterface(null);
    }, 1200);
  };

  const connectConfiguredVpn = () => {
    setPromptType(null);
    setConnectingInterface("vpn");
    setTimeout(() => {
      updateSystemSetting("vpn", true);
      setConnectingInterface(null);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[460px]">
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Network Interfaces
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6 divide-y divide-gray-100">
        {/* Wi-Fi interface (Dynamic) */}
        <div className="flex items-center justify-between p-3.5 px-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                wifi
                  ? activeWifiNetwork
                    ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                    : "bg-yellow-500"
                  : "bg-gray-300"
              }`}
            />
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
        <div className="group transition-all duration-150">
          <div
            onClick={() => handleInterfaceClick("thunderbolt")}
            className="flex items-center justify-between p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  thunderbolt ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-gray-300"
                }`}
              />
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-gray-700">Thunderbolt Bridge</span>
                {connectingInterface === "thunderbolt" && (
                  <Loader2 size={13} className="animate-spin text-[#007aff]" />
                )}
              </div>
            </div>
            <span
              className={`text-[12px] font-medium ${thunderbolt ? "text-[#007aff]" : "text-gray-500"}`}
            >
              {thunderbolt ? "Connected" : "Not Connected"}
            </span>
          </div>

          {/* Thunderbolt Details Accordion */}
          {thunderbolt && (
            <div className="bg-blue-50/20 px-6 py-3 border-t border-gray-100 text-xs text-gray-600 space-y-2 animate-in slide-in-from-top-1 duration-150">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">IP Address</span>
                <span className="font-mono text-gray-700">169.254.89.21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Subnet Mask</span>
                <span className="font-mono text-gray-700">255.255.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Router</span>
                <span className="text-gray-700 font-medium">None</span>
              </div>
            </div>
          )}
        </div>

        {/* VPN */}
        <div className="group transition-all duration-150">
          <div
            onClick={() => handleInterfaceClick("vpn")}
            className="flex items-center justify-between p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  vpn ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-gray-300"
                }`}
              />
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-gray-700">VPN</span>
                {connectingInterface === "vpn" && (
                  <Loader2 size={13} className="animate-spin text-[#007aff]" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-right">
              {vpnConfig && !vpn && (
                <span className="text-[10px] text-gray-400 font-semibold">Configured</span>
              )}
              <span
                className={`text-[12px] font-medium ${vpn ? "text-[#007aff]" : "text-gray-500"}`}
              >
                {vpn ? "Connected" : vpnConfig ? "Not Connected" : "Not Configured"}
              </span>
            </div>
          </div>

          {/* VPN Details Accordion */}
          {vpn && vpnConfig && (
            <div className="bg-blue-50/20 px-6 py-3 border-t border-gray-100 text-xs text-gray-600 space-y-2 animate-in slide-in-from-top-1 duration-150">
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Server</span>
                <span className="font-mono text-gray-700">{vpnConfig.server}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Account</span>
                <span className="text-gray-700 font-medium">{vpnConfig.account}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-semibold">Status</span>
                <span className="text-green-600 font-bold">Secured Tunnel</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Security
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-150 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-lg ${firewall ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"}`}
            >
              {firewall ? <Shield size={18} /> : <ShieldAlert size={18} />}
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block">Firewall</span>
              <span className="text-[11px] text-gray-400 font-semibold block">
                {firewall ? "Block incoming connections" : "Firewall disabled"}
              </span>
            </div>
          </div>
          <button onClick={() => toggleSystemSetting("firewall")} className="focus:outline-none">
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
              <span>
                Firewall is enabled and active. Your Mac is preventing unauthorized applications and
                services from accepting incoming connections.
              </span>
            </p>
          ) : (
            <p className="flex items-start gap-1 text-red-700/80 bg-red-50/45 p-2.5 rounded-lg border border-red-200/50">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>
                Warning: The firewall is turned off. Your computer is unprotected from unauthorized
                incoming connection attempts.
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Thunderbolt Prompt */}
      {promptType === "thunderbolt" && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-[#007aff]/10 text-[#007aff] flex items-center justify-center mx-auto mb-3">
              <Cable size={20} />
            </div>
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">
              Connect Thunderbolt Bridge
            </h4>
            <p className="text-[11.5px] text-gray-500 mt-1.5 mb-5 font-medium leading-relaxed">
              Connect this computer to another Mac using a direct Thunderbolt Bridge link?
            </p>
            <div className="flex gap-2 justify-end text-[11px]">
              <button
                type="button"
                onClick={() => setPromptType(null)}
                className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={connectThunderbolt}
                className="px-4 py-1.5 rounded-md bg-[#007aff] text-white hover:bg-[#0062cc] font-semibold"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VPN Config Prompt */}
      {promptType === "vpn_config" && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-[#007aff]/10 text-[#007aff] flex items-center justify-center mx-auto mb-3">
              <Network size={20} />
            </div>
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">Configure New VPN</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 mb-3 font-semibold">
              Enter your VPN server credentials
            </p>
            <form onSubmit={saveAndConnectVpn} className="space-y-3.5 text-left">
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase">
                  Server Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="vpn.example.com"
                  value={vpnServer}
                  onChange={(e) => setVpnServer(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 font-semibold"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase">Account Name</label>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={vpnAccount}
                  onChange={(e) => setVpnAccount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 font-semibold"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={vpnPassword}
                  onChange={(e) => setVpnPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 font-semibold"
                />
              </div>
              <div className="flex gap-2 justify-end text-[11px] pt-1">
                <button
                  type="button"
                  onClick={() => setPromptType(null)}
                  className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#007aff] text-white hover:bg-[#0062cc] font-semibold"
                >
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VPN Connect Dialog (Already Configured) */}
      {promptType === "vpn_connect" && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-[#007aff]/10 text-[#007aff] flex items-center justify-center mx-auto mb-3">
              <Key size={20} />
            </div>
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">Connect VPN</h4>
            <p className="text-[11.5px] text-gray-500 mt-1.5 mb-5 font-medium leading-relaxed">
              Initiate connection to configured VPN server{" "}
              <strong>&ldquo;{vpnConfig?.server}&rdquo;</strong>?
            </p>
            <div className="flex gap-2 justify-end text-[11px]">
              <button
                type="button"
                onClick={() => setPromptType(null)}
                className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={connectConfiguredVpn}
                className="px-4 py-1.5 rounded-md bg-[#007aff] text-white hover:bg-[#0062cc] font-semibold"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ToggleRightActive = () => (
  <div className="w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer bg-[#007aff]">
    <span className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all left-[18px]" />
  </div>
);

const ToggleRightInactive = () => (
  <div className="w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer bg-gray-300">
    <span className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md transition-all left-0.5" />
  </div>
);

export default SettingsNetworkSection;
