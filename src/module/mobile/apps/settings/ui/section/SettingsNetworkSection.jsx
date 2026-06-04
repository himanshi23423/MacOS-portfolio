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
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[460px]">
      {/* Network Interfaces Section */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Network Interfaces
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
          {/* Wi-Fi interface (Display-only status) */}
          <div className="flex items-center justify-between p-3.5 px-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 bg-blue-500`}
              >
                <Wifi size={18} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight font-sans">
                  Wi-Fi
                </h3>
                {wifi && activeWifiNetwork && (
                  <p className="text-[11px] text-gray-450 mt-0.5 font-medium">
                    {activeWifiNetwork}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  wifi
                    ? activeWifiNetwork
                      ? "bg-green-500 shadow-[0_0_6px_#22c55e]"
                      : "bg-yellow-500"
                    : "bg-gray-300"
                }`}
              />
              <span className="text-[14px] font-semibold text-gray-400">
                {wifi ? (activeWifiNetwork ? "Connected" : "Not Connected") : "Inactive"}
              </span>
            </div>
          </div>

          {/* Thunderbolt Bridge Cell */}
          <div
            onClick={() => handleInterfaceClick("thunderbolt")}
            className="flex flex-col cursor-pointer active:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center justify-between p-3.5 px-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 transition-colors ${
                    thunderbolt ? "bg-green-500" : "bg-zinc-400"
                  }`}
                >
                  <Cable size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight font-sans">
                    Thunderbolt Bridge
                  </h3>
                  <p className="text-[11px] text-gray-455 mt-0.5 font-medium">
                    {connectingInterface === "thunderbolt"
                      ? "Connecting..."
                      : thunderbolt
                        ? "Direct Link Connected"
                        : "Direct Link Disconnected"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {connectingInterface === "thunderbolt" ? (
                  <Loader2 size={14} className="animate-spin text-blue-500" />
                ) : (
                  <>
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        thunderbolt ? "bg-green-500 shadow-[0_0_6px_#22c55e]" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-[14px] font-semibold ${
                        thunderbolt ? "text-blue-500 font-bold" : "text-gray-400"
                      }`}
                    >
                      {thunderbolt ? "Connected" : "Not Connected"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Thunderbolt Details Accordion */}
            {thunderbolt && (
              <div className="bg-zinc-50/50 px-6 py-3.5 border-t border-zinc-100 text-xs text-gray-600 space-y-2.5 animate-in slide-in-from-top-1 duration-150">
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

          {/* VPN Cell */}
          <div
            onClick={() => handleInterfaceClick("vpn")}
            className="flex flex-col cursor-pointer active:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center justify-between p-3.5 px-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 bg-indigo-500`}
                >
                  <Network size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight font-sans">
                    VPN
                  </h3>
                  <p className="text-[11px] text-gray-450 mt-0.5 font-medium">
                    {connectingInterface === "vpn"
                      ? "Securing tunnel..."
                      : vpn
                        ? vpnConfig?.server
                        : vpnConfig
                          ? "Configured"
                          : "Not Configured"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {connectingInterface === "vpn" ? (
                  <Loader2 size={14} className="animate-spin text-blue-500" />
                ) : (
                  <>
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        vpn ? "bg-green-500 shadow-[0_0_6px_#22c55e]" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-[14px] font-semibold ${
                        vpn ? "text-blue-500 font-bold" : "text-gray-400"
                      }`}
                    >
                      {vpn ? "Connected" : vpnConfig ? "Not Connected" : "Not Configured"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* VPN Details Accordion */}
            {vpn && vpnConfig && (
              <div className="bg-zinc-50/50 px-6 py-3.5 border-t border-zinc-100 text-xs text-gray-600 space-y-2.5 animate-in slide-in-from-top-1 duration-150">
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
      </div>

      {/* Security Section */}
      <div>
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
          Security
        </h3>
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 transition-colors ${
                  firewall ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <Shield size={18} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight font-sans">
                  Firewall
                </h3>
                <p className="text-[11px] text-gray-450 mt-0.5 font-medium">
                  {firewall ? "Block incoming connections" : "Firewall disabled"}
                </p>
              </div>
            </div>

            {/* iOS style blue toggle */}
            <button
              onClick={() => toggleSystemSetting("firewall")}
              className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
                firewall ? "bg-blue-500" : "bg-zinc-200"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                  firewall ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="text-[12px] leading-relaxed font-medium">
            {firewall ? (
              <p className="flex items-start gap-2 text-green-700 bg-green-50/40 p-3 rounded-xl border border-green-200/50">
                <Info size={14} className="shrink-0 mt-0.5 text-green-500" />
                <span>
                  Firewall is enabled and active. Your iPhone is preventing unauthorized
                  applications and services from accepting incoming connections.
                </span>
              </p>
            ) : (
              <p className="flex items-start gap-2 text-red-700 bg-red-50/45 p-3 rounded-xl border border-red-200/50">
                <Info size={14} className="shrink-0 mt-0.5 text-red-500" />
                <span>
                  Warning: The firewall is turned off. Your device is unprotected from unauthorized
                  incoming connection attempts.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Thunderbolt Connect Modal */}
      {promptType === "thunderbolt" && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/5 rounded-3xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-3">
              <Cable size={20} />
            </div>
            <h4 className="text-[16px] font-bold text-gray-900 leading-tight">
              Connect Thunderbolt Bridge
            </h4>
            <p className="text-[12px] text-gray-500 mt-1.5 mb-5 font-semibold leading-relaxed">
              Connect this device to another host using a direct Thunderbolt Bridge link?
            </p>
            <div className="flex gap-2.5 justify-end text-xs">
              <button
                type="button"
                onClick={() => setPromptType(null)}
                className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-gray-700 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={connectThunderbolt}
                className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold cursor-pointer border-none"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VPN Config Modal */}
      {promptType === "vpn_config" && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/5 rounded-3xl shadow-2xl p-5 w-85 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-3">
              <Network size={20} />
            </div>
            <h4 className="text-[16px] font-bold text-gray-900 leading-tight">Configure New VPN</h4>
            <p className="text-[12px] text-gray-450 mt-1 mb-4">Enter your VPN server credentials</p>
            <form onSubmit={saveAndConnectVpn} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                  Server Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="vpn.example.com"
                  value={vpnServer}
                  onChange={(e) => setVpnServer(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-gray-805 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-1 font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                  Account Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={vpnAccount}
                  onChange={(e) => setVpnAccount(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-gray-805 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-1 font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Required"
                  value={vpnPassword}
                  onChange={(e) => setVpnPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-gray-805 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-1 font-semibold"
                />
              </div>
              <div className="flex gap-2.5 justify-end text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setPromptType(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold cursor-pointer border-none"
                >
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VPN Connect Modal (Already Configured) */}
      {promptType === "vpn_connect" && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/5 rounded-3xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-3">
              <Key size={20} />
            </div>
            <h4 className="text-[16px] font-bold text-gray-900 leading-tight">Connect VPN</h4>
            <p className="text-[12px] text-gray-500 mt-1.5 mb-5 font-semibold leading-relaxed">
              Initiate connection to configured VPN server <br />
              <strong>&ldquo;{vpnConfig?.server}&rdquo;</strong>?
            </p>
            <div className="flex gap-2.5 justify-end text-xs">
              <button
                type="button"
                onClick={() => setPromptType(null)}
                className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-gray-700 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={connectConfiguredVpn}
                className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold cursor-pointer border-none"
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

export default SettingsNetworkSection;
