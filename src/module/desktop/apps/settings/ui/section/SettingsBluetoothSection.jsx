import { Bluetooth, ToggleRight } from "lucide-react";

const SettingsBluetoothSection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <Bluetooth size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Bluetooth</h3>
          <p className="text-[12px] text-gray-500">Discoverable as &ldquo;MacBook Pro&rdquo;</p>
        </div>
      </div>
      <ToggleRight size={36} className="text-blue-500 cursor-pointer" />
    </div>
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">My Devices</h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] font-medium text-gray-900">AirPods Pro</span>
        <span className="text-[13px] text-blue-500">Connected</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <span className="text-[13px] text-gray-700">Magic Keyboard</span>
        <span className="text-[13px] text-gray-500">Not Connected</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <span className="text-[13px] text-gray-700">Magic Mouse</span>
        <span className="text-[13px] text-gray-500">Not Connected</span>
      </div>
    </div>
  </div>
);

export default SettingsBluetoothSection;
