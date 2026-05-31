import windowWrapper from "@hoc/windowWrapper";
import AppStoreSection from "../section/AppStoreSection";

const AppStore = () => <AppStoreSection />;

const AppStoreWindow = windowWrapper(AppStore, "appstore");
export default AppStoreWindow;
