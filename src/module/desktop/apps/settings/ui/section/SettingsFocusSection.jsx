import { Moon, PlusCircle, ToggleLeft } from "lucide-react";

const SettingsFocusSection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
          <Moon size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Do Not Disturb</h3>
          <p className="text-[12px] text-gray-500">Silences notifications</p>
        </div>
      </div>
      <ToggleLeft size={36} className="text-gray-300 cursor-pointer" />
    </div>
    <div className="w-full border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
      <PlusCircle size={16} className="text-gray-500" />
      <span className="text-[13px] font-medium text-gray-600">Add Focus</span>
    </div>
  </div>
);

export default SettingsFocusSection;
