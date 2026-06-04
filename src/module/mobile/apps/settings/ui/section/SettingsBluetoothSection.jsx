import React, { useState } from "react";
import { Bluetooth, Info, Loader2 } from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsBluetoothSection = () => {
  const { systemSettings, updateSystemSetting } = useWindowsStore();
  const { bluetooth, bluetoothDevices } = systemSettings;

  const [connectingDevice, setConnectingDevice] = useState(null);
  const [promptDevice, setPromptDevice] = useState(null); // { key, label, action: 'connect' | 'disconnect' }

  const toggleDevice = (deviceKey, label) => {
    if (connectingDevice) return;

    const isConnected = bluetoothDevices[deviceKey];
    setPromptDevice({
      key: deviceKey,
      label: label,
      action: isConnected ? "disconnect" : "connect",
    });
  };

  const confirmAction = () => {
    if (!promptDevice) return;
    const { key, action } = promptDevice;
    setPromptDevice(null);

    if (action === "disconnect") {
      // Disconnect immediately
      const newDevices = {
        ...bluetoothDevices,
        [key]: false,
      };
      updateSystemSetting("bluetoothDevices", newDevices);
    } else {
      // Set to connecting state for 1.2 seconds
      setConnectingDevice(key);
      setTimeout(() => {
        const newDevices = {
          ...bluetoothDevices,
          [key]: true,
        };
        updateSystemSetting("bluetoothDevices", newDevices);
        setConnectingDevice(null);
      }, 1200);
    }
  };

  const devicesList = [
    { key: "airpods", label: "AirPods Pro" },
    { key: "keyboard", label: "Magic Keyboard" },
    { key: "mouse", label: "Magic Mouse" },
    { key: "headphones", label: "Bose QC45" },
  ];

  return (
    <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[440px]">
      {/* Bluetooth Switch Cell */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
            <Bluetooth size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Bluetooth</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {bluetooth ? "Now discoverable as iPhone" : "Off"}
            </p>
          </div>
        </div>

        {/* iOS style blue toggle */}
        <button
          onClick={() => updateSystemSetting("bluetooth", !bluetooth)}
          className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer ${
            bluetooth ? "bg-blue-500" : "bg-zinc-200"
          }`}
        >
          <div
            className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
              bluetooth ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {bluetooth ? (
        <>
          <div>
            <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
              My Devices
            </h3>
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
              {devicesList.map((dev) => {
                const isConnected = bluetoothDevices[dev.key];
                const isConnecting = connectingDevice === dev.key;
                return (
                  <div
                    key={dev.key}
                    onClick={() => toggleDevice(dev.key, dev.label)}
                    className="flex items-center justify-between p-3.5 pl-4 cursor-pointer active:bg-zinc-50 transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-gray-800">{dev.label}</span>
                    <div className="flex items-center gap-1.5 shrink-0 text-gray-450">
                      {isConnecting && (
                        <Loader2 size={13} className="animate-spin text-blue-500 mr-0.5" />
                      )}
                      <span
                        className={`text-[14px] ${isConnecting ? "text-blue-500 font-semibold" : isConnected ? "text-blue-500 font-bold" : "text-gray-400 font-medium"}`}
                      >
                        {isConnecting
                          ? "Connecting..."
                          : isConnected
                            ? "Connected"
                            : "Not Connected"}
                      </span>
                      <Info size={16} className="text-zinc-350 ml-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[12px] text-gray-400 px-3 leading-relaxed">
            Paired accessories can be connected by tapping them.
          </p>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">Bluetooth is turned off.</p>
          <p className="text-[11px] text-gray-400 mt-1">
            Connections with Apple Watch and other devices are unavailable.
          </p>
        </div>
      )}

      {/* Bluetooth Prompt Modal */}
      {promptDevice && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/5 rounded-3xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3">
              <Bluetooth size={20} />
            </div>
            <h4 className="text-[16px] font-bold text-gray-900 leading-tight">
              {promptDevice.action === "connect" ? "Connect Device" : "Disconnect Device"}
            </h4>
            <p className="text-[12px] text-gray-500 mt-1.5 mb-5 font-semibold leading-relaxed">
              {promptDevice.action === "connect"
                ? `Would you like to connect to "${promptDevice.label}"?`
                : `Would you like to disconnect from "${promptDevice.label}"?`}
            </p>
            <div className="flex gap-2.5 justify-end text-xs">
              <button
                type="button"
                onClick={() => setPromptDevice(null)}
                className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-gray-700 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAction}
                className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-semibold cursor-pointer border-none"
              >
                {promptDevice.action === "connect" ? "Connect" : "Disconnect"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsBluetoothSection;
