import windowWrapper from "@hoc/windowWrapper";
import SafariSection from "../section/SafariSection";

const Safari = () => <SafariSection />;

const SafariWindow = windowWrapper(Safari, "safari");
export default SafariWindow;
