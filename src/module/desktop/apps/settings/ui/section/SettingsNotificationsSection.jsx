import { Bell } from "lucide-react";

const SettingsNotificationsSection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Notification Style</h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="/images/safari.png" className="w-6 h-6 object-contain" alt="Safari" />
          <span className="text-[13px] font-medium text-gray-900">Safari</span>
        </div>
        <span className="text-[12px] text-gray-500">Banners, Sounds, Badges</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="/images/finder.png" className="w-6 h-6 object-contain" alt="Finder" />
          <span className="text-[13px] font-medium text-gray-900">Finder</span>
        </div>
        <span className="text-[12px] text-gray-500">Badges</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded text-white flex items-center justify-center"><Bell size={12} /></div>
          <span className="text-[13px] font-medium text-gray-900">System Messages</span>
        </div>
        <span className="text-[12px] text-gray-500">Banners, Sounds</span>
      </div>
    </div>
  </div>
);

export default SettingsNotificationsSection;
