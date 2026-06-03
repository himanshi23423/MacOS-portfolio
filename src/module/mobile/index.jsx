import AppleTV from "@module/mobile/apps/appletv/ui/view/AppleTVView";
import AppStore from "@module/mobile/apps/appstore/ui/view/AppStoreView";
import Calculator from "@module/mobile/apps/calculator/ui/view/CalculatorView";
import Calendar from "@module/mobile/apps/calendar/ui/view/CalendarView";
import Call from "@module/mobile/apps/call/ui/view/CallView";
import Chrome from "@module/mobile/apps/chrome/ui/view/ChromeView";
import Contact from "@module/mobile/apps/contact/ui/view/ContactView";
import Finder from "@module/mobile/apps/finder/ui/view/FinderView";
import FontBook from "@module/mobile/apps/fontbook/ui/view/FontBookView";
import Image from "@module/mobile/apps/image/ui/view/ImageView";
import Launchpad from "@module/mobile/apps/launchpad/ui/view/LaunchpadView";
import Map from "@module/mobile/apps/map/ui/view/MapView";
import Messages from "@module/mobile/apps/messages/ui/view/MessagesView";
import MobileOS from "@module/mobile/apps/mobile-os/ui/view/MobileOSView";
import Music from "@module/mobile/apps/music/ui/view/MusicView";
import Notes from "@module/mobile/apps/notes/ui/view/NotesView";
import Photos from "@module/mobile/apps/photos/ui/view/PhotosView";
import dynamic from "next/dynamic";
import Postman from "@module/mobile/apps/postman/ui/view/PostmanView";
const Resume = dynamic(() => import("@module/mobile/apps/resume/ui/view/ResumeView"), {
  ssr: false,
});
import Safari from "@module/mobile/apps/safari/ui/view/SafariView";
import Settings from "@module/mobile/apps/settings/ui/view/SettingsView";
import Telegram from "@module/mobile/apps/telegram/ui/view/TelegramView";
const Terminal = dynamic(() => import("@module/mobile/apps/terminal/ui/view/TerminalView"), {
  ssr: false,
});
import Text from "@module/mobile/apps/text/ui/view/TextView";
import VSCode from "@module/mobile/apps/vscode/ui/view/VSCodeView";
import Weather from "@module/mobile/apps/weather/ui/view/WeatherView";
import AssistiveTouch from "./apps/mobile-os/ui/components/AssistiveTouch";

const Mobile = () => (
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
    <AssistiveTouch />
  </main>
);

export default Mobile;
