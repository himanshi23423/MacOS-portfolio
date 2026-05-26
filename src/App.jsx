import Dock from "#components/Dock";
import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome";
import Finder from "#windows/Finder";
import Resume from "#windows/Resume";
import Safari from "#windows/Safari";
import Terminal from "#windows/Terminal";
import Text from "#windows/Text";
import Image from "#windows/Image";
import Contact from "#windows/Contact";
import Home from "#components/Home";
import Photos from "#windows/Photos";
import Settings from "#windows/Settings";
import Calculator from "#windows/Calculator";
import Notes from "#windows/Notes";
import MobileOS from "#components/MobileOS";
import BootScreen from "#components/BootScreen";
import LoginScreen from "#components/LoginScreen";
import gsap from "gsap";
import { useState, useEffect } from "react";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [booting, setBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}
        {!booting && !isLoggedIn && <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
        {isLoggedIn && (
          <main className="mobile-os">
            <MobileOS />
            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Contact />
            <Photos />
            <Settings />
            <Calculator />
            <Notes />
          </main>
        )}
      </>
    );
  }

  return (
    <>
      {booting && <BootScreen onComplete={() => setBooting(false)} />}
      {!booting && !isLoggedIn && <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
      {isLoggedIn && (
        <main>
          <Navbar />
          <Welcome />
          <Dock />
          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <Image />
          <Contact />
          <Photos />
          <Settings />
          <Calculator />
          <Notes />
          <Home />
        </main>
      )}
    </>
  );
};

export default App;
