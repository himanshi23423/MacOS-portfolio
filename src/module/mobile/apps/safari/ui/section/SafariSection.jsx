import { projects, socials } from "@constants";
import { SafariMobileHeader } from "../components/SafariToolbar";

const SafariSection = () => {
  return <SafariMobileHeader socials={socials} projects={projects} />;
};

export default SafariSection;
