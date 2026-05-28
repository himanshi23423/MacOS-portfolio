import { Eye, Search, Ear, Hand } from "lucide-react";

const SettingsAccessibilitySection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Vision</h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-6">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-2"><Eye size={16} className="text-blue-500" /> <span className="text-[13px] text-gray-900">VoiceOver</span></div>
        <span className="text-[13px] text-gray-500">Off</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-2"><Search size={16} className="text-blue-500" /> <span className="text-[13px] text-gray-900">Zoom</span></div>
        <span className="text-[13px] text-gray-500">Off</span>
      </div>
    </div>
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Hearing</h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-2"><Ear size={16} className="text-blue-500" /> <span className="text-[13px] text-gray-900">Audio</span></div>
      </div>
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-2"><Hand size={16} className="text-blue-500" /> <span className="text-[13px] text-gray-900">Subtitles</span></div>
      </div>
    </div>
  </div>
);

export default SettingsAccessibilitySection;
