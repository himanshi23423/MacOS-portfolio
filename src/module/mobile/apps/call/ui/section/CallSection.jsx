import CallHeaderSection from "./CallHeaderSection";
import CallSidebarSection from "./CallSidebarSection";
import CallStandbySection from "./CallStandbySection";
import CallInProgress from "../components/CallInProgress";

const CallSection = ({
  sidebarTab, setSidebarTab,
  searchQuery, setSearchQuery,
  dialNumber, setDialNumber,
  isSidebarOpen, setIsSidebarOpen,
  activeCall,
  callTimer,
  micMuted, setMicMuted,
  cameraMuted, setCameraMuted,
  speakerMuted, setSpeakerMuted,
  handleDialPress,
  handleBackspace,
  initiateCall,
  endCall,
  formatTimer,
}) => {
  const handleInitiateCall = (name, type) => {
    initiateCall(name, type);
    setIsSidebarOpen(false);
  };

  const handleClear = () => setDialNumber("");

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10 select-none text-gray-800 relative">
      <CallHeaderSection isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex min-h-0 relative">
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-20 sm:hidden"
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
