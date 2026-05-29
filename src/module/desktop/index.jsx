import AppleTV from "#module/desktop/apps/appletv/ui";
import AppStore from "#module/desktop/apps/appstore/ui";
import Calculator from "#module/desktop/apps/calculator/ui";
import Calendar from "#module/desktop/apps/calendar/ui";
import Call from "#module/desktop/apps/call/ui";
import Chrome from "#module/desktop/apps/chrome/ui";
import Contact from "#module/desktop/apps/contact/ui";
import Dock from "#module/desktop/dock/ui";
import Finder from "#module/desktop/apps/finder/ui";
import FontBook from "#module/desktop/apps/fontbook/ui";
import Home from "#module/desktop/home/ui";
import Image from "#module/desktop/apps/image/ui";
import Launchpad from "#module/desktop/apps/launchpad/ui";
import Map from "#module/desktop/apps/map/ui";
import Messages from "#module/desktop/apps/messages/ui";
import Music from "#module/desktop/apps/music/ui";
import Navbar from "#module/desktop/navbar/ui";
import Notes from "#module/desktop/apps/notes/ui";
import Photos from "#module/desktop/apps/photos/ui";
import Postman from "#module/desktop/apps/postman/ui";
import Resume from "#module/desktop/apps/resume/ui";
import Safari from "#module/desktop/apps/safari/ui";
import Settings from "#module/desktop/apps/settings/ui";
import Telegram from "#module/desktop/apps/telegram/ui";
import Terminal from "#module/desktop/apps/terminal/ui";
import Text from "#module/desktop/apps/text/ui";
import VSCode from "#module/desktop/apps/vscode/ui";
import Weather from "#module/desktop/apps/weather/ui";
import Welcome from "#module/desktop/apps/welcome/ui";
import Notch from "./components/Notch";

const Desktop = () => (
  <main>
    <Navbar />
    <Notch />
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
