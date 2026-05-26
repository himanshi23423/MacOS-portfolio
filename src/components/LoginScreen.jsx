import { useState } from "react";
import { ArrowRight, Moon, Power, RotateCcw } from "lucide-react";

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [isAsleep, setIsAsleep] = useState(false);

  const handleShutDown = () => {
    window.open("about:blank", "_blank");
    window.close();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for any password (or even empty)
    onLogin();
  };

  return (
    <>
      {isAsleep && (
        <div
          className="fixed inset-0 z-[999999] bg-black cursor-pointer"
          onClick={() => setIsAsleep(false)}
        ></div>
      )}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-md">
      {/* User Login Section */}
      <div className="flex flex-col items-center mt-[-10vh]">
        <img
          src="/images/profile.jpg"
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover shadow-lg border-2 border-white/20 mb-4"
        />
        <h1 className="text-white text-2xl font-medium tracking-wide mb-6 drop-shadow-md">
          Kuldeep rajput
        </h1>

        <form
          onSubmit={handleLogin}
          className="relative flex items-center group w-48"
        >
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/20 hover:bg-white/30 focus:bg-white/30 backdrop-blur-md text-white placeholder-white/70 rounded-full py-1.5 px-4 pr-10 outline-none text-sm font-medium transition-colors border border-white/10 focus:border-white/30"
          />
          <button
            type="submit"
            className="absolute right-1 w-6 h-6 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors border border-white/20"
          >
            <ArrowRight className="text-white w-3.5 h-3.5" strokeWidth={3} />
          </button>
        </form>
        <p className="text-white/70 text-xs mt-3 font-medium drop-shadow-sm">
          Press Enter to login
        </p>
      </div>

      {/* Bottom Power Controls */}
      <div className="absolute bottom-16 flex gap-10">
        <button 
          className="flex flex-col items-center gap-2 group outline-none"
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
          className="flex flex-col items-center gap-2 group outline-none"
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
          className="flex flex-col items-center gap-2 group outline-none"
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
    </>
  );
};

export default LoginScreen;
