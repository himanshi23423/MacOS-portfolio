import React, { useState } from "react";
import { Bluetooth, Loader2, Info } from "lucide-react";
import useWindowsStore from "#store/window";

const SettingsBluetoothSection = () => {
  const { systemSettings, toggleSystemSetting } = useWindowsStore();
  const { bluetooth } = systemSettings;
  const [connectingDevice, setConnectingDevice] = useState(null);
  
  // Track device states locally or mock them
  const [devices, setDevices] = useState([
    { id: 1, name: "AirPods Pro", connected: true },
    { id: 2, name: "Magic Keyboard", connected: false },
    { id: 3, name: "Magic Mouse", connected: false }
  ]);

  const handleToggle = () => {
    toggleSystemSetting("bluetooth");
  };

  const toggleDeviceConnection = (id, name) => {
    if (connectingDevice) return;
    setConnectingDevice(id);
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === id ? { ...d, connected: !d.connected } : d));
      setConnectingDevice(null);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
            bluetooth ? "bg-[#007aff]" : "bg-gray-400"
          }`}>
            <Bluetooth size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Bluetooth</h3>
            <p className="text-[12px] text-gray-500">
              {bluetooth ? "Discoverable as \"MacBook Pro\"" : "Off"}
            </p>
          </div>
        </div>
        <button 
          onClick={handleToggle}
          className="focus:outline-none"
        >
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
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">My Devices</h3>
            <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-150">
              {devices.map((device) => {
                const isConnecting = connectingDevice === device.id;
                return (
                  <div 
                    key={device.id}
                    onClick={() => toggleDeviceConnection(device.id, device.name)}
                    className="flex items-center justify-between p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] font-semibold ${device.connected ? "text-gray-900" : "text-gray-600"}`}>
                        {device.name}
                      </span>
                      {isConnecting && <Loader2 size={13} className="animate-spin text-[#007aff]" />}
                    </div>
                    <span className={`text-[12px] font-medium ${device.connected ? "text-[#007aff]" : "text-gray-400"}`}>
                      {device.connected ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 shadow-sm">
          <Bluetooth size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-[13px] font-semibold text-gray-500">Bluetooth is turned off.</p>
          <p className="text-[11px] text-gray-400 mt-1">Enable Bluetooth to search for and connect to nearby accessories.</p>
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

export default SettingsBluetoothSection;
