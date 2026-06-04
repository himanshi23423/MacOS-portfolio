import { Wifi, Bluetooth, AppWindow } from "lucide-react";

const SettingsControlCenterSection = () => (
  <div className="w-full px-4 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">
      Control Center Modules
    </h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Wifi size={16} className="text-blue-500" />
          <span className="text-[13px] font-medium text-gray-900">Wi-Fi</span>
        </div>
        <span className="text-[12px] text-gray-500">Show in Menu Bar</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Bluetooth size={16} className="text-blue-500" />
          <span className="text-[13px] font-medium text-gray-900">Bluetooth</span>
        </div>
        <span className="text-[12px] text-gray-500">Show in Menu Bar</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-3">
          <AppWindow size={16} className="text-blue-500" />
          <span className="text-[13px] font-medium text-gray-900">Stage Manager</span>
        </div>
        <span className="text-[12px] text-gray-500">Don&rsquo;t Show in Menu Bar</span>
      </div>
    </div>
  </div>
);

export default SettingsControlCenterSection;
