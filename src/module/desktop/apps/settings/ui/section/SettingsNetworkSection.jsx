import { Shield } from "lucide-react";

const SettingsNetworkSection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[13px] font-medium text-gray-900">Wi-Fi</span>
        </div>
        <span className="text-[13px] text-gray-500">Connected</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <span className="text-[13px] text-gray-700">Thunderbolt Bridge</span>
        </div>
        <span className="text-[13px] text-gray-500">Not Connected</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <span className="text-[13px] text-gray-700">VPN</span>
        </div>
        <span className="text-[13px] text-gray-500">Not Configured</span>
      </div>
    </div>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-2 text-gray-900">
          <Shield size={16} /> <span className="text-[13px]">Firewall</span>
        </div>
        <span className="text-[13px] text-gray-500">Active</span>
      </div>
    </div>
  </div>
);

export default SettingsNetworkSection;
