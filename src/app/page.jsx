"use client";

import LoadingView from "@module/loading/ui/view/LoadingView";
import Desktop from "@module/desktop";
import Mobile from "@module/mobile";
import gsap from "gsap";
import { useState, useEffect } from "react";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Page() {
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
        <LoadingView
          booting={booting}
          isLoggedIn={isLoggedIn}
          onBootComplete={() => setBooting(false)}
          onLogin={() => setIsLoggedIn(true)}
        />
        {isLoggedIn && <Mobile />}
      </>
    );
  }

  return (
    <>
      <LoadingView
        booting={booting}
        isLoggedIn={isLoggedIn}
        onBootComplete={() => setBooting(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
      {isLoggedIn && <Desktop />}
    </>
  );
}
