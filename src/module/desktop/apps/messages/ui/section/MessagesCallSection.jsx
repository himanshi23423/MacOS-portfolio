import CallOverlay from "../components/CallOverlay";

const MessagesCallSection = ({
  callState,
  callDuration,
  activeChat,
  onMicToggle,
  onCameraToggle,
  onEndCall,
  formatCallTime,
}) => {
  if (!callState.isOpen) return null;

  return (
    <CallOverlay
      callState={callState}
      callDuration={callDuration}
      activeChat={activeChat}
      onMicToggle={onMicToggle}
      onCameraToggle={onCameraToggle}
      onEndCall={onEndCall}
      formatCallTime={formatCallTime}
    />
  );
};

export default MessagesCallSection;
