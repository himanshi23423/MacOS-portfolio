import { useState, useEffect, useRef } from "react";
import CallHeaderSection from "./CallHeaderSection";
import CallSidebarSection from "./CallSidebarSection";
import CallStandbySection from "./CallStandbySection";
import CallInProgress from "../components/CallInProgress";

const CallSection = ({
  sidebarTab,
  setSidebarTab,
  searchQuery,
  setSearchQuery,
  dialNumber,
  setDialNumber,
  isSidebarOpen,
  setIsSidebarOpen,
  activeCall,
  callTimer,
  micMuted,
  setMicMuted,
  cameraMuted,
  setCameraMuted,
  speakerMuted,
  setSpeakerMuted,
  handleDialPress,
  handleBackspace,
  initiateCall,
  endCall,
  formatTimer,
}) => {
  const [isNarrow, setIsNarrow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setIsNarrow(width < 580);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isNarrow) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isNarrow, setIsSidebarOpen]);

  const handleInitiateCall = (name, type) => {
    initiateCall(name, type);
    setIsSidebarOpen(false);
  };

  const handleClear = () => setDialNumber("");

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative"
    >
      <CallHeaderSection
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isNarrow={isNarrow}
      />

      <div className="flex-1 flex min-h-0 relative">
        {isNarrow && isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 cursor-pointer"
          />
        )}

        <CallSidebarSection
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onInitiateCall={handleInitiateCall}
          dialNumber={dialNumber}
          onDialPress={handleDialPress}
          onBackspace={handleBackspace}
          onClear={handleClear}
          onInputChange={setDialNumber}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={() => setIsSidebarOpen(false)}
          isNarrow={isNarrow}
        />

        <main className="flex-1 bg-gray-50 flex flex-col h-full min-h-0 relative select-none">
          {activeCall ? (
            <CallInProgress
              activeCall={activeCall}
              callTimer={callTimer}
              micMuted={micMuted}
              cameraMuted={cameraMuted}
              speakerMuted={speakerMuted}
              onMicToggle={() => setMicMuted(!micMuted)}
              onCameraToggle={() => setCameraMuted(!cameraMuted)}
              onSpeakerToggle={() => setSpeakerMuted(!speakerMuted)}
              onEndCall={endCall}
              formatTimer={formatTimer}
            />
          ) : (
            <CallStandbySection />
          )}
        </main>
      </div>
    </div>
  );
};

export default CallSection;
