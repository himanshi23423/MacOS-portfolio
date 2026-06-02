"use client";

import LoadingView from "@module/loading/ui/view/LoadingView";
import Desktop from "@module/desktop";
import Mobile from "@module/mobile";
import gsap from "gsap";
import { useState, useEffect } from "react";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [booting, setBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 bg-black z-99999" />;
  }

  if (isMobile) {
    return (
      <>
        <LoadingView
          booting={booting}
          isLoggedIn={isLoggedIn}
          isMobile={isMobile}
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
        isMobile={isMobile}
        onBootComplete={() => setBooting(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
      {isLoggedIn && <Desktop />}
    </>
  );
}
