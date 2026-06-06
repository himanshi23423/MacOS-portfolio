import AppleTV from "@module/desktop/apps/appletv/ui/view/AppleTVView";
import AppStore from "@module/desktop/apps/appstore/ui/view/AppStoreView";
import Calculator from "@module/desktop/apps/calculator/ui/view/CalculatorView";
import Calendar from "@module/desktop/apps/calendar/ui/view/CalendarView";
import Call from "@module/desktop/apps/call/ui/view/CallView";
import Chrome from "@module/desktop/apps/chrome/ui/components/Chrome";
import Contact from "@module/desktop/apps/contact/ui/view/ContactView";
import Dock from "@module/desktop/dock/ui/view/DockView";
import DockVisualizer from "./dock/ui/components/DockVisualizer";
import Finder from "@module/desktop/apps/finder/ui/view/FinderView";
import FontBook from "@module/desktop/apps/fontbook/ui/view/FontBookView";
import Home from "@module/desktop/home/ui/view/HomeView";
import Image from "@module/desktop/apps/image/ui/view/ImageView";
import Launchpad from "@module/desktop/apps/launchpad/ui/view/LaunchpadView";
import Map from "@module/desktop/apps/map/ui/view/MapView";
import Messages from "@module/desktop/apps/messages/ui/view/MessagesView";
import Music from "@module/desktop/apps/music/ui/view/MusicView";
import Navbar from "@module/desktop/navbar/ui/view/NavbarView";
import Notes from "@module/desktop/apps/notes/ui/view/NotesView";
import Photos from "@module/desktop/apps/photos/ui/view/PhotosView";
import dynamic from "next/dynamic";
import Postman from "@module/desktop/apps/postman/ui/view/PostmanView";
const Resume = dynamic(() => import("@module/desktop/apps/resume/ui/view/ResumeView"), {
  ssr: false,
});
import Safari from "@module/desktop/apps/safari/ui/view/SafariView";
import Settings from "@module/desktop/apps/settings/ui/view/SettingsView";
import Telegram from "@module/desktop/apps/telegram/ui/view/TelegramView";
const Terminal = dynamic(() => import("@module/desktop/apps/terminal/ui/view/TerminalView"), {
  ssr: false,
});
import Text from "@module/desktop/apps/text/ui/view/TextView";
import VSCode from "@module/desktop/apps/vscode/ui/view/VSCodeView";
import Weather from "@module/desktop/apps/weather/ui/view/WeatherView";
import Welcome from "@module/desktop/apps/welcome/ui/view/WelcomeView";
import Notch from "./notch/ui/view/NotchView";

const DesktopWidgets = dynamic(() => import("./widgets/ui/components/Widgets"), {
  ssr: false,
});

const Desktop = () => (
  <main>
    <Navbar />
    <Notch />
    <div
      id="desktop-area"
      className="absolute top-[35px] bottom-0 left-0 right-0 pointer-events-none z-0"
    />
    <DesktopWidgets />
    <div id="folder-bounds" className="absolute pointer-events-none z-0" />
    <Welcome />
    <DockVisualizer />
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
    <Messages />
    <AppleTV />
    <Call />
    <AppStore />
    <Calendar />
    <Weather />
    <Chrome />
    <VSCode />
    <Postman />
    <Map />
    <FontBook />
    <Telegram />
    <Music />
    <Launchpad />
    <Home />
  </main>
);

export default Desktop;
