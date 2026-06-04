import React, { useState } from "react";
import {
  Smartphone,
  RefreshCw,
  HardDrive,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Info,
} from "lucide-react";

const SettingsGeneralPane = () => {
  const [subPage, setSubPage] = useState(null); // 'about', 'update', 'storage', 'datetime', null

  // Software update state
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("Your iPhone is up to date.");

  // Date & Time state
  const [autoTime, setAutoTime] = useState(true);

  const checkUpdates = () => {
    if (checkingUpdate) return;
    setCheckingUpdate(true);
    setTimeout(() => {
      setCheckingUpdate(false);
      setUpdateStatus("iOS 18.0 is currently the latest version available.");
    }, 1500);
  };

  if (subPage === "about") {
    return (
      <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setSubPage(null)}
          className="flex items-center gap-1 text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>General</span>
        </button>

        {/* Device Info */}
        <div className="flex flex-col items-center py-2">
          <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700 shadow-inner mb-3">
            <Smartphone size={32} strokeWidth={1.8} />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 leading-tight">iPhone 16 Pro</h2>
          <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
            iOS 18.0
          </p>
        </div>

        {/* Specifications Group */}
        <div>
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider ml-3 mb-2">
            Specifications
          </h3>
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
            <div className="flex items-center justify-between p-3.5 pl-4">
              <span className="text-[14px] font-semibold text-gray-700">Name</span>
              <span className="text-[14px] font-bold text-gray-900">iPhone (Kuldeep)</span>
            </div>
            <div className="flex items-center justify-between p-3.5 pl-4">
              <span className="text-[14px] font-semibold text-gray-700">iOS Version</span>
              <span className="text-[14px] font-medium text-gray-500">18.0 (22A3354)</span>
            </div>
            <div className="flex items-center justify-between p-3.5 pl-4">
              <span className="text-[14px] font-semibold text-gray-700">Model Name</span>
              <span className="text-[14px] font-medium text-gray-500">iPhone 16 Pro</span>
            </div>
            <div className="flex items-center justify-between p-3.5 pl-4">
              <span className="text-[14px] font-semibold text-gray-700">Model Number</span>
              <span className="text-[14px] font-medium text-gray-500">MYM13LL/A</span>
            </div>
            <div className="flex items-center justify-between p-3.5 pl-4">
              <span className="text-[14px] font-semibold text-gray-700">Chip</span>
              <span className="text-[14px] font-medium text-gray-500">A18 Pro</span>
            </div>
            <div className="flex items-center justify-between p-3.5 pl-4">
              <span className="text-[14px] font-semibold text-gray-700">Serial Number</span>
              <span className="text-[14px] font-mono text-[13px] text-gray-500">C02X20YZJHD3</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subPage === "update") {
    return (
      <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setSubPage(null)}
          className="flex items-center gap-1 text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>General</span>
        </button>

        <div className="flex items-center gap-3.5 pb-2">
          <div className="w-9 h-9 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <RefreshCw size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 leading-tight">Software Update</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Check for system updates</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center space-y-4">
          <Smartphone size={40} className="text-blue-500 opacity-20" />

          {checkingUpdate ? (
            <div className="flex flex-col items-center gap-1.5">
              <Loader2 size={24} className="animate-spin text-blue-500" />
              <span className="text-[13px] font-bold text-gray-700">Checking for updates...</span>
            </div>
          ) : (
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-gray-800">{updateStatus}</h3>
              <p className="text-[11px] text-gray-400 font-semibold">
                iOS 18.0. Automatic Updates: On
              </p>
            </div>
          )}

          <button
            onClick={checkUpdates}
            disabled={checkingUpdate}
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-xs font-bold transition-colors cursor-pointer border-none"
          >
            Check for Updates
          </button>
        </div>
      </div>
    );
  }

  if (subPage === "storage") {
    return (
      <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setSubPage(null)}
          className="flex items-center gap-1 text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>General</span>
        </button>

        <div className="flex items-center gap-3.5 pb-2">
          <div className="w-9 h-9 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center shrink-0">
            <HardDrive size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 leading-tight">iPhone Storage</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Manage storage spaces</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[14px] font-bold text-gray-850">iPhone</span>
            <span className="text-xs font-semibold text-gray-400">88 GB of 256 GB Used</span>
          </div>

          {/* Stained storage chart */}
          <div className="w-full flex h-4 bg-zinc-100 rounded-md overflow-hidden">
            <div className="h-full bg-blue-500 w-[35%]" title="Apps" />
            <div className="h-full bg-red-400 w-[20%]" title="Media" />
            <div className="h-full bg-yellow-500 w-[15%]" title="System Data" />
            <div className="h-full bg-zinc-300 w-[10%]" title="Other" />
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-[11px] font-bold text-gray-500 border-t border-zinc-100 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-blue-500" />
              <span className="text-gray-700">Apps (38 GB)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-red-400" />
              <span className="text-gray-700">Media (22 GB)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-yellow-500" />
              <span className="text-gray-700">System (16 GB)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-zinc-300" />
              <span className="text-gray-700">Other (12 GB)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subPage === "datetime") {
    return (
      <div className="w-full px-4 py-6 space-y-6 select-none animate-in fade-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setSubPage(null)}
          className="flex items-center gap-1 text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>General</span>
        </button>

        <div className="flex items-center gap-3.5 pb-2">
          <div className="w-9 h-9 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
            <Clock size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-gray-900 leading-tight">Date & Time</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Manage clock settings</p>
          </div>
        </div>

        {/* Automatic Toggle Switch */}
        <div className="bg-white rounded-2xl border border-black/5 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex justify-between items-center">
          <div>
            <span className="font-bold text-gray-800 text-[15px] block leading-tight">
              Set Automatically
            </span>
            <span className="text-[11px] text-gray-400 font-medium block mt-1">
              Use Apple network time servers (time.apple.com)
            </span>
          </div>
          <button
            onClick={() => setAutoTime(!autoTime)}
            className={`w-[51px] h-[31px] rounded-full transition-colors relative flex items-center px-0.5 border-none outline-none cursor-pointer shrink-0 ${
              autoTime ? "bg-blue-500" : "bg-zinc-200"
            }`}
          >
            <div
              className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transition-transform duration-200 ${
                autoTime ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Server details */}
        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-xs text-gray-650 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-gray-400 font-semibold">Time Zone</span>
            <span className="text-gray-700 font-semibold">India Standard Time (IST)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-semibold">Source Server</span>
            <span className="font-mono text-gray-700">time.apple.com</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 space-y-5 select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Device Info Card Header */}
      <div
        onClick={() => setSubPage("about")}
        className="bg-white rounded-2xl border border-black/5 p-4 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] cursor-pointer active:bg-zinc-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 shadow-inner shrink-0">
            <Smartphone size={20} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 leading-tight">About</h3>
            <p className="text-[12px] text-gray-400 mt-0.5">iPhone 16 Pro, iOS 18.0</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300 shrink-0" />
      </div>

      {/* Main General Settings Groups */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-zinc-100">
        {/* Software Update */}
        <div
          onClick={() => setSubPage("update")}
          className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 cursor-pointer active:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-500 text-white rounded-md flex items-center justify-center shrink-0">
              <RefreshCw size={14} />
            </div>
            <span className="text-[15px] font-semibold text-gray-800">Software Update</span>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </div>

        {/* Storage */}
        <div
          onClick={() => setSubPage("storage")}
          className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 cursor-pointer active:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-purple-500 text-white rounded-md flex items-center justify-center shrink-0">
              <HardDrive size={14} />
            </div>
            <span className="text-[15px] font-semibold text-gray-800">iPhone Storage</span>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </div>

        {/* Date & Time */}
        <div
          onClick={() => setSubPage("datetime")}
          className="flex justify-between items-center p-3.5 pl-4 hover:bg-zinc-50 cursor-pointer active:bg-zinc-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-orange-500 text-white rounded-md flex items-center justify-center shrink-0">
              <Clock size={14} />
            </div>
            <span className="text-[15px] font-semibold text-gray-800">Date & Time</span>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneralPane;
