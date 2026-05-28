import { Volume1, Volume2, ToggleRight } from "lucide-react";

const SettingsSoundSection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-2 mb-2">Output</h3>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Volume1 size={20} className="text-gray-500 shrink-0" />
        <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" defaultValue={65} />
        <Volume2 size={20} className="text-gray-500 shrink-0" />
      </div>
      <div className="flex justify-between items-center text-[13px]">
        <span className="text-gray-900 font-medium">MacBook Pro Speakers</span>
        <span className="text-gray-500">Built-in</span>
      </div>
    </div>
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between">
      <span className="text-[13px] text-gray-900">Play user interface sound effects</span>
      <ToggleRight size={32} className="text-blue-500 cursor-pointer" />
    </div>
  </div>
);

export default SettingsSoundSection;
