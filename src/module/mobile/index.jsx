import AppleTV from "#module/mobile/apps/appletv/ui";
import AppStore from "#module/mobile/apps/appstore/ui";
import Calculator from "#module/mobile/apps/calculator/ui";
import Calendar from "#module/mobile/apps/calendar/ui";
import Call from "#module/mobile/apps/call/ui";
import Chrome from "#module/mobile/apps/chrome/ui";
import Contact from "#module/mobile/apps/contact/ui";
import Finder from "#module/mobile/apps/finder/ui";
import FontBook from "#module/mobile/apps/fontbook/ui";
import Image from "#module/mobile/apps/image/ui";
import Launchpad from "#module/mobile/apps/launchpad/ui";
import Map from "#module/mobile/apps/map/ui";
import Messages from "#module/mobile/apps/messages/ui";
import MobileOS from "#module/mobile/apps/mobile-os/ui";
import Music from "#module/mobile/apps/music/ui";
import Notes from "#module/mobile/apps/notes/ui";
import Photos from "#module/mobile/apps/photos/ui";
import Postman from "#module/mobile/apps/postman/ui";
import Resume from "#module/mobile/apps/resume/ui";
import Safari from "#module/mobile/apps/safari/ui";
import Settings from "#module/mobile/apps/settings/ui";
import Telegram from "#module/mobile/apps/telegram/ui";
import Terminal from "#module/mobile/apps/terminal/ui";
import Text from "#module/mobile/apps/text/ui";
import VSCode from "#module/mobile/apps/vscode/ui";
import Weather from "#module/mobile/apps/weather/ui";

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
  </main>
);

export default Mobile;
