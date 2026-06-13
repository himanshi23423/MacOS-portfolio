import React, { useState, useEffect } from "react";
import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import useWindowsStore from "@store/window";
import ContactCard from "./ContactCard";
import ContactList from "./ContactList";
import ContactAboutModal from "./ContactAboutModal";

const Contact = () => {
  const { windows, setWindowData } = useWindowsStore();
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (windows.contact?.data?.openAbout) {
      setShowAbout(true);
      setWindowData("contact", { ...windows.contact.data, openAbout: false });
    }
  }, [windows.contact?.data?.openAbout, windows.contact?.data, setWindowData]);

  const [copied, setCopied] = useState("");

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <>
      <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
        <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
          <WindowControls target={"contact"} />
          <h2 className="flex-1 text-center text-sm font-bold text-gray-500">Contact Me</h2>
        </div>
        <div className="p-5 space-y-5 flex-1 overflow-y-auto">
          <ContactCard
            email="kuldeeprajput67718@gmail.com"
            phone="+91 9765996045"
            copied={copied}
            onCopy={handleCopy}
          />
          <ContactList />
        </div>
      </div>
      <ContactAboutModal show={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

const ContactWindow = windowWrapper(Contact, "contact");
export default ContactWindow;
