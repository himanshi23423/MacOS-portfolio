import { useState } from "react";
import WindowControls from "#components/WindowControls";
import { Copy, Check } from "lucide-react";
import { socials } from "#constants";
import windowWrapper from "#hoc/windowWrapper";

const Contact = () => {
  const [copied, setCopied] = useState("");

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };
  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
        <WindowControls target={"contact"} />
        <h2 className="flex-1 text-center text-sm font-bold text-gray-500">Contact Me</h2>
      </div>
      <div className="p-5 space-y-5 flex-1 overflow-y-auto">
        <img
          src={"/images/profile.jpg"}
          alt="kuldeep"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>
          Full-stack developer building scalable apps—let’s connect and create
          something impactful.
        </p>
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleCopy("kuldeeprajput67718@gmail.com", "email")}
        >
          <p className="hover:text-blue-500 transition-colors">
            kuldeeprajput67718@gmail.com
          </p>
          {copied === "email" ? (
            <Check size={14} className="text-green-500 animate-in zoom-in" />
          ) : (
            <Copy
              size={14}
              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
          {copied === "email" && (
            <span className="text-xs text-green-500 font-medium animate-in fade-in slide-in-from-left-1">
              Copied!
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleCopy("+91 9765996045", "phone")}
        >
          <p className="hover:text-blue-500 transition-colors">
            +91 9765996045
          </p>
          {copied === "phone" ? (
            <Check size={14} className="text-green-500 animate-in zoom-in" />
          ) : (
            <Copy
              size={14}
              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
          {copied === "phone" && (
            <span className="text-xs text-green-500 font-medium animate-in fade-in slide-in-from-left-1">
              Copied!
            </span>
          )}
        </div>

        <ul className="flex flex-wrap items-center gap-3">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }} className="flex-1 min-w-[140px]">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="space-y-5 flex flex-col justify-between h-full"
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ContactWindow = windowWrapper(Contact, "contact");
export default ContactWindow;
