import React, { useState } from "react";
import {
  Hourglass,
  Lock,
  Eye,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Info,
  AlertTriangle,
  Monitor,
  Calendar,
} from "lucide-react";

const SettingsScreenTimeSection = () => {
  const [activeSubPage, setActiveSubPage] = useState(null); // 'downtime', 'limits', 'privacy', null
  const [selectedDay, setSelectedDay] = useState("Thu");

  // Downtime state
  const [downtimeEnabled, setDowntimeEnabled] = useState(false);
  const [downtimeSchedule, setDowntimeSchedule] = useState("Daily");

  // App limits state
  const [developerLimit, setDeveloperLimit] = useState(4); // hours
  const [socialLimit, setSocialLimit] = useState(2); // hours
  const [limitsEnabled, setLimitsEnabled] = useState(true);

  // Content & Privacy state
  const [privacyEnabled, setPrivacyEnabled] = useState(false);

  // Weekly data mapping
  const weeklyData = {
    Mon: { total: "4h 12m", dev: 180, prod: 60, other: 12 },
    Tue: { total: "5h 48m", dev: 220, prod: 110, other: 18 },
    Wed: { total: "7h 15m", dev: 300, prod: 90, other: 45 },
    Thu: { total: "6h 24m", dev: 250, prod: 110, other: 24 }, // Today
    Fri: { total: "3h 30m", dev: 120, prod: 70, other: 20 },
    Sat: { total: "2h 15m", dev: 40, prod: 45, other: 50 },
    Sun: { total: "1h 45m", dev: 20, prod: 35, other: 50 },
  };

  const currentDayData = weeklyData[selectedDay];
  const _totalMinutes = currentDayData.dev + currentDayData.prod + currentDayData.other;

  const appUsage = [
    { name: "VS Code", category: "Development", time: "4h 10m", percentage: 65, icon: "💻" },
    {
      name: "Safari",
      category: "Productivity",
      time: "1h 50m",
      percentage: 28,
      icon: "🌐",
    },
    { name: "Spotify", category: "Other", time: "24m", percentage: 7, icon: "🎵" },
  ];

  if (activeSubPage === "downtime") {
    return (
      <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setActiveSubPage(null)}
          className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-[#007aff] transition-colors focus:outline-none mb-6 p-1 rounded hover:bg-gray-150"
        >
          <ArrowLeft size={13} />
          <span>Back to Screen Time</span>
        </button>

        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-150">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-lg">
            <Monitor size={20} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900 leading-tight">Downtime</h2>
            <p className="text-[11.5px] text-gray-400 font-semibold mt-0.5">
              Schedule time away from the screen
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex justify-between items-center text-xs text-gray-700">
          <div>
            <span className="font-bold text-gray-900 block">Enable Downtime</span>
            <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
              Only allowed apps and calls will be available
            </span>
          </div>
          <button
            onClick={() => setDowntimeEnabled(!downtimeEnabled)}
            className="focus:outline-none"
          >
            {downtimeEnabled ? (
              <ToggleRightActive size={32} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={32} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>

        {downtimeEnabled && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4 text-xs text-gray-700 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-semibold text-gray-700">Schedule type</span>
              <select
                value={downtimeSchedule}
                onChange={(e) => setDowntimeSchedule(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-gray-700 font-semibold focus:outline-none"
              >
                <option value="Daily">Every Day</option>
                <option value="Weekends">Weekends Only</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Time Range</span>
              <span className="font-mono text-gray-700 font-semibold bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                22:00 - 07:00
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeSubPage === "limits") {
    return (
      <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setActiveSubPage(null)}
          className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-[#007aff] transition-colors focus:outline-none mb-6 p-1 rounded hover:bg-gray-150"
        >
          <ArrowLeft size={13} />
          <span>Back to Screen Time</span>
        </button>

        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-150">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white text-lg">
            <Hourglass size={20} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900 leading-tight">App Limits</h2>
            <p className="text-[11.5px] text-gray-400 font-semibold mt-0.5">
              Set daily time limits for app categories
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex justify-between items-center text-xs text-gray-700">
          <div>
            <span className="font-bold text-gray-900 block">Enforce Limits</span>
            <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
              Block apps when limits are reached
            </span>
          </div>
          <button onClick={() => setLimitsEnabled(!limitsEnabled)} className="focus:outline-none">
            {limitsEnabled ? (
              <ToggleRightActive size={32} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={32} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>

        {limitsEnabled && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4 text-xs text-gray-700 animate-in fade-in duration-200">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Development Limit</span>
                <span className="font-mono text-gray-600 font-semibold">
                  {developerLimit} Hours
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={developerLimit}
                onChange={(e) => setDeveloperLimit(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div className="space-y-3 border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Productivity & Social Limit</span>
                <span className="font-mono text-gray-600 font-semibold">{socialLimit} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={socialLimit}
                onChange={(e) => setSocialLimit(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeSubPage === "privacy") {
    return (
      <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setActiveSubPage(null)}
          className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-[#007aff] transition-colors focus:outline-none mb-6 p-1 rounded hover:bg-gray-150"
        >
          <ArrowLeft size={13} />
          <span>Back to Screen Time</span>
        </button>

        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-150">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white text-lg">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900 leading-tight">
              Content & Privacy
            </h2>
            <p className="text-[11.5px] text-gray-400 font-semibold mt-0.5">
              Restrict web content, downloads, and app settings
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex justify-between items-center text-xs text-gray-700">
          <div>
            <span className="font-bold text-gray-900 block">Content & Privacy Restrictions</span>
            <span className="text-[10.5px] text-gray-400 font-semibold block mt-0.5">
              Toggle content constraints
            </span>
          </div>
          <button onClick={() => setPrivacyEnabled(!privacyEnabled)} className="focus:outline-none">
            {privacyEnabled ? (
              <ToggleRightActive size={32} className="text-[#007aff] cursor-pointer" />
            ) : (
              <ToggleRightInactive size={32} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>

        {privacyEnabled ? (
          <div className="bg-green-50/40 border border-green-200 p-4 rounded-xl flex items-start gap-2.5 text-xs text-green-700 animate-in fade-in duration-200">
            <ShieldCheck size={16} className="shrink-0 mt-0.5 text-green-600" />
            <div>
              <span className="font-bold block">Restrictions Enabled</span>
              <span className="font-medium block mt-0.5">
                Adult content filtering, private window limitations, and mock security protocols are
                now actively enforced.
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50/40 border border-yellow-200 p-4 rounded-xl flex items-start gap-2.5 text-xs text-yellow-700 animate-in fade-in duration-200">
            <ShieldAlert size={16} className="shrink-0 mt-0.5 text-yellow-600" />
            <div>
              <span className="font-bold block">No Restrictions Active</span>
              <span className="font-medium block mt-0.5">
                Content, privacy limits, and restricted system modifications are currently bypassed
                on this Mac.
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Calculate daily average summary dynamically from weeklyData keys
  const dailyAverage = "5h 15m";

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
      {/* Top Graphic Stats Card */}
      <div className="w-full bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-[26px] font-extrabold text-gray-900 tracking-tight leading-tight">
              {currentDayData.total}
            </h2>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
              {selectedDay === "Thu" ? "Today, " : ""}Selected: {selectedDay} (Average:{" "}
              {dailyAverage})
            </p>
          </div>
          <Calendar size={18} className="text-gray-400" />
        </div>

        {/* Weekly Vertical Bar Chart Graph */}
        <div className="h-28 flex items-end justify-between gap-2.5 mb-5 px-1 pt-4 border-b border-gray-100">
          {Object.entries(weeklyData).map(([day, val]) => {
            const isSelected = selectedDay === day;
            const dayMinutes = val.dev + val.prod + val.other;
            const maxVal = 435; // Wed total minutes
            const scalePct = (dayMinutes / maxVal) * 100;

            // stacked bar percentages
            const devPct = (val.dev / dayMinutes) * 100;
            const prodPct = (val.prod / dayMinutes) * 100;
            const otherPct = (val.other / dayMinutes) * 100;

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex flex-col items-center justify-end h-full flex-1 cursor-pointer group"
              >
                <div
                  className={`w-full rounded-t-sm overflow-hidden flex flex-col justify-end transition-all duration-150 ${
                    isSelected ? "ring-2 ring-blue-500/50 scale-x-105" : "hover:brightness-95"
                  }`}
                  style={{ height: `${scalePct}%`, minHeight: "4px" }}
                >
                  <div style={{ height: `${otherPct}%` }} className="bg-cyan-400 w-full" />
                  <div style={{ height: `${prodPct}%` }} className="bg-indigo-400 w-full" />
                  <div style={{ height: `${devPct}%` }} className="bg-blue-500 w-full" />
                </div>
                <span
                  className={`text-[10px] mt-1.5 font-bold ${
                    isSelected
                      ? "text-blue-500 font-extrabold"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Color Key Details */}
        <div className="flex justify-between text-[11px] font-semibold text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-gray-700">Development</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span className="text-gray-700">Productivity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-gray-700">Other</span>
          </div>
        </div>
      </div>

      {/* Screen Time Utilities Option lists */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Controls
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
        {/* Downtime */}
        <div
          onClick={() => setActiveSubPage("downtime")}
          className="flex justify-between items-center p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
              <Monitor size={14} />
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block leading-tight">
                Downtime
              </span>
              <span className="text-[10px] text-gray-400 font-semibold block leading-tight mt-0.5">
                {downtimeEnabled ? `Enabled (${downtimeSchedule})` : "Off"}
              </span>
            </div>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>

        {/* App Limits */}
        <div
          onClick={() => setActiveSubPage("limits")}
          className="flex justify-between items-center p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center">
              <Hourglass size={14} />
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block leading-tight">
                App Limits
              </span>
              <span className="text-[10px] text-gray-400 font-semibold block leading-tight mt-0.5">
                {limitsEnabled ? `Active limits set` : "Off"}
              </span>
            </div>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>

        {/* Content & Privacy */}
        <div
          onClick={() => setActiveSubPage("privacy")}
          className="flex justify-between items-center p-3.5 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-red-500 text-white rounded-lg flex items-center justify-center">
              <Lock size={14} />
            </div>
            <div>
              <span className="text-[13px] font-bold text-gray-900 block leading-tight">
                Content & Privacy
              </span>
              <span className="text-[10px] text-gray-400 font-semibold block leading-tight mt-0.5">
                {privacyEnabled ? "Enabled" : "Off"}
              </span>
            </div>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
      </div>

      {/* App Usage Details list */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">
        Most Used Apps
      </h3>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
        {appUsage.map((app) => (
          <div key={app.name} className="flex justify-between items-center p-3.5 px-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-sm border border-gray-200">
                {app.icon}
              </div>
              <div>
                <span className="text-[13px] font-bold text-gray-800 block leading-tight">
                  {app.name}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold block leading-tight mt-0.5">
                  {app.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-1.5 bg-gray-150 rounded-full overflow-hidden">
                <div style={{ width: `${app.percentage}%` }} className="h-full bg-blue-500" />
              </div>
              <span className="text-[12px] font-mono font-semibold text-gray-500 text-right w-12">
                {app.time}
              </span>
            </div>
          </div>
        ))}
      </div>
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

export default SettingsScreenTimeSection;
