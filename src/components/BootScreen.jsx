import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const BootScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Simulate the Mac boot progress bar
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.2,
      ease: "power1.inOut",
      delay: 0.4,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-99999 bg-black flex flex-col items-center justify-center gap-16"
    >
      <img src="/icons/appleLogo.svg" alt="Apple Logo" width="70" height="70" />
      <div className="w-56 h-1.5 bg-[#333] rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-white rounded-full w-0" />
      </div>
    </div>
  );
};

export default BootScreen;
