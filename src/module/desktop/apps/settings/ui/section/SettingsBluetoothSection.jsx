import React, { useState } from "react";
import { Bluetooth, Loader2, Info, RefreshCw } from "lucide-react";
import useWindowsStore from "@store/window";

const SettingsBluetoothSection = () => {
  const { systemSettings, toggleSystemSetting, updateSystemSetting } = useWindowsStore();
  const { bluetooth, bluetoothDevices } = systemSettings;
  const [connectingDevice, setConnectingDevice] = useState(null);

  // Scanning and Prompt states
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [promptingDevice, setPromptingDevice] = useState(null);

  const devices = [
    { key: "airpods", name: "AirPods Pro", connected: bluetoothDevices?.airpods || false },
    { key: "keyboard", name: "Magic Keyboard", connected: bluetoothDevices?.keyboard || false },
    { key: "mouse", name: "Magic Mouse", connected: bluetoothDevices?.mouse || false },
  ];

  if (hasScanned) {
    devices.push({
      key: "headphones",
      name: "Sony WH-1000XM5",
      connected: bluetoothDevices?.headphones || false,
    });
  }

  const handleToggle = () => {
    toggleSystemSetting("bluetooth");
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setHasScanned(true);
    }, 1200);
  };

  const handleDeviceClick = (device) => {
    if (connectingDevice) return;

    if (device.connected) {
      // Disconnect instantly
      const updated = { ...bluetoothDevices, [device.key]: false };
      updateSystemSetting("bluetoothDevices", updated);
    } else {
      // Open connection prompt
      setPromptingDevice(device);
    }
  };

  const confirmConnection = () => {
    if (!promptingDevice) return;
    const targetKey = promptingDevice.key;
    setPromptingDevice(null);
    setConnectingDevice(targetKey);
    setTimeout(() => {
      const updated = { ...bluetoothDevices, [targetKey]: true };
      updateSystemSetting("bluetoothDevices", updated);
      setConnectingDevice(null);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative min-h-[400px]">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
              bluetooth ? "bg-[#007aff]" : "bg-gray-400"
            }`}
          >
            <Bluetooth size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Bluetooth</h3>
            <p className="text-[12px] text-gray-500">
              {bluetooth ? 'Discoverable as "MacBook Pro"' : "Off"}
            </p>
          </div>
        </div>
        <button onClick={handleToggle} className="focus:outline-none">
          {bluetooth ? (
            <ToggleRightActive size={36} className="text-[#007aff] cursor-pointer" />
          ) : (
            <ToggleRightInactive size={36} className="text-gray-300 cursor-pointer" />
          )}
        </button>
      </div>

      {bluetooth ? (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between ml-1 mb-2">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                My Devices
              </h3>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-[#007aff] disabled:text-gray-300 transition-colors focus:outline-none p-1 rounded hover:bg-gray-100"
              >
                <RefreshCw
                  size={11}
                  className={isRefreshing ? "animate-spin text-[#007aff]" : ""}
                />
                <span>{isRefreshing ? "Scanning..." : "Scan"}</span>
              </button>
            </div>

            {isRefreshing ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 shadow-sm flex flex-col items-center justify-center">
                <Loader2 size={24} className="animate-spin text-[#007aff] mb-2" />
                <span className="text-[12px] font-semibold text-gray-500">
                  Searching for accessories...
                </span>
              </div>
            ) : (
              <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
                {devices.map((device) => {
                  const isConnecting = connectingDevice === device.key;
                  return (
                    <div
                      key={device.key}
                      onClick={() => handleDeviceClick(device)}
                      className="flex items-center justify-between p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[13px] font-semibold ${device.connected ? "text-gray-900" : "text-gray-600"}`}
                        >
                          {device.name}
                        </span>
                        {isConnecting && (
                          <Loader2 size={13} className="animate-spin text-[#007aff]" />
                        )}
                      </div>
                      <span
                        className={`text-[12px] font-medium ${device.connected ? "text-[#007aff]" : "text-gray-400"}`}
                      >
                        {device.connected ? "Connected" : "Not Connected"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 shadow-sm">
          <Bluetooth size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-[13px] font-semibold text-gray-500">Bluetooth is turned off.</p>
          <p className="text-[11px] text-gray-400 mt-1">
            Enable Bluetooth to search for and connect to nearby accessories.
          </p>
        </div>
      )}

      {/* Bluetooth Connect Confirmation Dialog */}
      {promptingDevice && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-80 max-w-full text-center select-none animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-[#007aff]/10 text-[#007aff] flex items-center justify-center mx-auto mb-3">
              <Bluetooth size={20} />
            </div>
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">
              Connection Request
            </h4>
            <p className="text-[11.5px] text-gray-500 mt-1.5 mb-5 font-medium leading-relaxed">
              Would you like to connect your MacBook to the accessory <br />
              <strong>&ldquo;{promptingDevice.name}&rdquo;</strong>?
            </p>
            <div className="flex gap-2 justify-end text-[11px]">
              <button
                type="button"
                onClick={() => setPromptingDevice(null)}
                className="px-4 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmConnection}
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

export default SettingsBluetoothSection;
