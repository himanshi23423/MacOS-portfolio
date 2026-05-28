import { Signal, Wifi } from "lucide-react";

const MobileOSStatusBar = ({ now, anyWindowOpen, setIsControlOpen, settings }) => (
  <header
    className="absolute top-0 left-0 w-full z-[70] flex justify-between items-end h-[54px] pl-[28px] pr-[24px] pb-1 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_70%,transparent_100%)]"
    onClick={() => !anyWindowOpen && setIsControlOpen((p) => !p)}
  >
    <time className="text-base font-semibold tracking-tight">
      {now.format("h:mm")}
    </time>
    <div className="flex items-center gap-[5px]">
      <Signal size={14} strokeWidth={2.2} />
      <Wifi size={14} strokeWidth={2.2} />
      <div className="flex items-center gap-[3px]">
        <div className="w-[25px] h-[12px] rounded-[3px] border-[1.5px] border-white p-[1.5px] relative">
          <div
            className="h-full rounded-[1.5px]"
            style={{
              width: `${settings.lowPower ? 40 : 100}%`,
              background: settings.lowPower ? "#f59e0b" : "#34c759",
            }}
          />
          <div className="absolute right-[-3.5px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] rounded-[1px] bg-white" />
        </div>
      </div>
    </div>
  </header>
);

export default MobileOSStatusBar;
