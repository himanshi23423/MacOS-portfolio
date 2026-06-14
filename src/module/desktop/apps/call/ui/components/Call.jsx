import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import useCall from "../../hooks/useCall";
import CallSection from "../section/CallSection";
import CallAboutModal from "./CallAboutModal";

const Call = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);
  const props = useCall();

  useEffect(() => {
    if (windows.call?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("call", { ...windows.call.data, openAbout: false });
    }
  }, [windows.call?.data?.openAbout, windows.call?.data, setWindowData]);

  return (
    <>
      <CallSection {...props} />
      <CallAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const CallWindow = windowWrapper(Call, "call");
export default CallWindow;
