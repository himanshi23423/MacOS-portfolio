const SettingsScreenTimeSection = () => (
  <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm mb-6 flex flex-col items-center">
      <h2 className="text-[28px] font-light text-gray-900 mb-1">6h 24m</h2>
      <p className="text-[12px] text-gray-500 mb-6">Daily Average</p>
      <div className="w-full flex h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-blue-500 w-[55%]" />
        <div className="h-full bg-indigo-400 w-[25%]" />
        <div className="h-full bg-cyan-400 w-[20%]" />
      </div>
      <div className="w-full flex justify-between px-2 text-[12px]">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-gray-700">Development</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-indigo-400" /><span className="text-gray-700">Productivity</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-cyan-400" /><span className="text-gray-700">Other</span></div>
      </div>
    </div>
  </div>
);

export default SettingsScreenTimeSection;
