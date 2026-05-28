import { useState, useEffect } from "react";
import { ArrowRight, Moon, Power, RotateCcw, Lock, ChevronLeft } from "lucide-react";

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [isAsleep, setIsAsleep] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState(false);

  // Time and Date State
  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  const getFormattedDate = () => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const [time, setTime] = useState(getFormattedTime());
  const [dateStr, setDateStr] = useState(getFormattedDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
      setDateStr(getFormattedDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Alternating between Namaste SVG (0) and Hello SVG (1)
  const [activeSvg, setActiveSvg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSvg((prev) => (prev === 0 ? 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const triggerFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Error attempting to enable fullscreen:", err);
      });
    }
  };

  // Handle keypresses for Unlock (Enter) or Escape to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showPasswordInput) {
        if (e.key === "Enter" || e.key === " ") {
          triggerFullscreen();
          setShowPasswordInput(true);
        }
      } else {
        if (e.key === "Escape") {
          setShowPasswordInput(false);
          setPassword("");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPasswordInput]);

  const handleShutDown = () => {
    window.open("about:blank", "_blank");
    window.close();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear().toString();
    if (password === currentYear) {
      onLogin();
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <>
      {isAsleep && (
        <div
          className="fixed inset-0 z-[999999] bg-black cursor-pointer"
          onClick={() => setIsAsleep(false)}
        ></div>
      )}

      {/* Styles for shake and smooth SVG drawing */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .shake-animation {
          animation: shake 0.4s ease-in-out;
        }

        @keyframes drawSvgPathNamaste {
          0% {
            stroke-dashoffset: 3462.72;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
        .svg-drawing-path-namaste {
          stroke-dasharray: 3462.72;
          stroke-dashoffset: 3462.72;
          animation: drawSvgPathNamaste 2.5s ease-in-out forwards;
        }

        @keyframes drawSvgPathHello {
          0% {
            stroke-dashoffset: -2000;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
        .svg-drawing-path-hello {
          stroke-dasharray: 2000;
          stroke-dashoffset: -2000;
          animation: drawSvgPathHello 2.5s ease-in-out forwards;
        }
      `}</style>

      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/10 backdrop-blur-lg select-none py-12 px-6"
        onClick={() => {
          if (!showPasswordInput) {
            triggerFullscreen();
            setShowPasswordInput(true);
          }
        }}
      >
        {!showPasswordInput ? (
          /* Lock Screen Phase */
          <div className="flex flex-col items-center justify-between h-full w-full max-w-lg text-white">
            {/* Top Lock and Date/Time */}
            <div className="flex flex-col items-center mt-6">
              <Lock className="w-5 h-5 text-white/90 mb-3" />
              <p className="text-white/90 text-lg font-medium tracking-wide drop-shadow-md">
                {dateStr}
              </p>
              <h1 className="text-white text-7xl sm:text-8xl font-light tracking-tighter drop-shadow-lg mt-1 select-text">
                {time}
              </h1>
            </div>

            {/* Central Animated SVG Greeting */}
            <div className="flex-1 flex items-center justify-center py-10 w-full max-w-xl px-4 overflow-hidden">
              {activeSvg === 0 ? (
                /* Namaste SVG */
                <svg 
                  key="namaste"
                  viewBox="0 0 786 331" 
                  className="w-full h-auto drop-shadow-[0_8px_24px_rgba(255,255,255,0.2)]"
                >
                  <path 
                    d="M152.163 130.821C155.884 171.241 155.392 193.902 152.163 234.321M151.663 303.824C155.663 354.324 147.329 268.298 152.163 234.321M152.163 234.321C108.727 198.737 83.1502 190.409 60.663 193.324M60.663 193.324C32.0982 193.351 29.5781 200.382 22.6628 217.324C19.4228 234.668 22.5001 240.864 33.6628 247.824C45.9487 254.637 53.3756 255.923 67.6628 253.324C75.2641 250.491 79.8886 245.664 82.163 225.324C82.3946 204.561 77.6677 199.437 60.663 193.324ZM263.663 128.824C269.565 162.487 269.176 180.577 263.663 211.824C261.738 228.106 257.035 239.784 242.663 264.824C229.588 281.175 198.205 273.237 196.663 245.824C195.678 228.313 210.163 214.824 210.163 214.824C210.163 214.824 220.663 205.324 249.663 205.324C278.663 205.324 342.219 234.321 342.219 234.321L343.295 130.565C345.972 129.913 338.626 371.48 339.663 307.824M453.663 130.684C498.393 145.245 516.058 159.254 529.663 178.324C546.163 200.324 527.578 241.7 495.163 257.824M495.163 257.824C495.163 257.824 441.163 261.824 417.663 245.824C394.163 229.824 405.163 207.324 417.663 200.324C430.163 193.324 465.793 204.292 484.163 237.824C484.163 237.824 514.162 312.824 517.162 319.324C520.163 325.824 495.163 257.824 495.163 257.824ZM535.162 229.824C570.663 242.324 633.664 247.324 613.163 234.824M722.163 304.324C721.186 251.842 719.663 129.436 719.663 129.436C712.603 90.5507 700.11 46.8239 700.663 60.8239M722.163 304.324C722.163 252.824 720.499 356.062 722.163 304.324ZM722.163 304.324C720.849 254.412 696.918 197.632 663.663 202.824C630.408 208.015 621.888 223.105 617.163 238.824C609.368 268.718 649.663 353.324 628.663 303.324M22.6629 128.824C-110.337 133.324 887.663 129.436 769.163 129.436M700.663 60.8239C699.163 22.8238 625.163 -1.17599 613.163 16.324C601.163 33.8239 623.055 46.5272 640.163 55.324C657.271 64.1207 687.163 83.3239 700.663 60.8239Z" 
                    stroke="white" 
                    strokeWidth="21" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="svg-drawing-path-namaste"
                  />
                </svg>
              ) : (
                /* Hello SVG */
                <svg 
                  key="hello"
                  viewBox="0 0 512 342" 
                  className="w-full h-auto drop-shadow-[0_8px_24px_rgba(255,255,255,0.2)]"
                >
                  <g transform="translate(256, 171)">
                    <path 
                      d="M210.25,1.907C191.75,22.382,184.25,11.881,159.25,2.516C122.234,-11.35,101.515,58.907,144.75,58.907C174.25,58.907,187.75,0.881,149.25,0.881C116.016,0.881,121.25,58.907,88.25,58.907C26.064,58.907,62.25,-63.593,88.25,-63.593C117.75,-63.593,82.75,58.907,31.75,58.907C-19.25,58.907,3.75,-63.593,29.75,-63.593C59.75,-63.593,33.25,58.907,-27.75,58.907C-69.25,58.907,-65.75,1.907,-36.25,1.907C-6.75,1.907,-62.313,81.381,-92.25,61.381C-110.25,49.356,-80.25,1.907,-111.25,1.907C-142.25,1.907,-143.25,51.286,-145.25,66.119C-137.25,-44.119,-125.75,-66.119,-107.75,-66.119C-89.75,-66.119,-94.275,-37.834,-107.75,-19.119C-129.258,10.754,-153.75,32.381,-210.25,47.881" 
                      stroke="white" 
                      strokeWidth="9" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="svg-drawing-path-hello"
                    />
                  </g>
                </svg>
              )}
            </div>

            {/* Bottom Profile and Prompt */}
            <div className="flex flex-col items-center gap-4">
              <img
                src="/images/profile.jpg"
                alt="Profile Avatar"
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
              />
              <div className="text-center">
                <p className="text-white/80 text-sm font-medium tracking-wide drop-shadow-sm animate-pulse">
                  Press Enter or Click to continue
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-white/50 text-[11px]">
                  <span>Press</span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/15 text-[10px] font-mono">F11</span>
                  <span>for Full Screen</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Password Screen Phase */
          <div className="flex flex-col items-center justify-between h-full w-full text-white">
            {/* Back Button to Lock Screen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPasswordInput(false);
                setPassword("");
              }}
              className="absolute top-8 left-8 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 text-xs text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Main Form Center */}
            <div className="flex-1 flex flex-col items-center justify-center mt-[-4vh]">
              <div className={error ? "shake-animation" : ""}>
                <div className="flex flex-col items-center">
                  <img
                    src="/images/profile.jpg"
                    alt="User Profile"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg border-2 border-white/20 mb-4"
                  />
                  <h1 className="text-white text-2xl font-medium tracking-wide mb-6 drop-shadow-md">
                    Kuldeep rajput
                  </h1>

                  <form
                    onSubmit={handleLogin}
                    onClick={(e) => e.stopPropagation()}
                    className="relative flex items-center group w-48"
                  >
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
                      className="w-full bg-white/20 hover:bg-white/30 focus:bg-white/30 backdrop-blur-md text-white placeholder-white/60 rounded-full py-1.5 px-4 pr-10 outline-none text-sm font-medium transition-colors border border-white/10 focus:border-white/30"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 w-6 h-6 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                    >
                      <ArrowRight className="text-white w-3.5 h-3.5" strokeWidth={3} />
                    </button>
                  </form>
                  <p className="text-white/60 text-xs mt-3 font-medium drop-shadow-sm">
                    Password is current year (e.g. {new Date().getFullYear()})
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Power Controls */}
            <div className="flex gap-10 mt-auto" onClick={(e) => e.stopPropagation()}>
              <button 
                className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
                onClick={() => setIsAsleep(true)}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10">
                  <Moon className="text-white w-4 h-4" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-md">
                  Sleep
                </span>
              </button>
              <button 
                className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
                onClick={() => window.location.reload()}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10">
                  <RotateCcw className="text-white w-4 h-4" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-md">
                  Restart
                </span>
              </button>
              <button 
                className="flex flex-col items-center gap-2 group outline-none cursor-pointer"
                onClick={handleShutDown}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10">
                  <Power className="text-white w-4 h-4" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-md">
                  Shut Down
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginScreen;
