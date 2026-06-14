import React, { useState, useEffect } from "react";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import AppStoreSection from "../section/AppStoreSection";
import AppStoreAboutModal from "./AppStoreAboutModal";

const AppStore = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.appstore?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("appstore", { ...windows.appstore.data, openAbout: false });
    }
  }, [windows.appstore?.data?.openAbout, windows.appstore?.data, setWindowData]);

  return (
    <>
      <AppStoreSection />
      <AppStoreAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const AppStoreWindow = windowWrapper(AppStore, "appstore");
export default AppStoreWindow;
