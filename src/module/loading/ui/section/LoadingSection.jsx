import BootScreen from "../components/BootScreen";
import LoginScreen from "../components/LoginScreen";

const LoadingSection = ({ booting, isLoggedIn, onBootComplete, onLogin }) => (
  <>
    {booting && <BootScreen onComplete={onBootComplete} />}
    {!booting && !isLoggedIn && <LoginScreen onLogin={onLogin} />}
  </>
);

export default LoadingSection;
