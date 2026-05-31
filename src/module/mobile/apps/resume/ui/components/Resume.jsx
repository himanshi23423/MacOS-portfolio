import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import { Download } from "lucide-react";

const Resume = () => {
  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div
        id="window-header"
        className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 flex items-center justify-between"
      >
        <WindowControls target={"resume"} />
        <h2>Resume.pdf</h2>
        <a href="/files/resume.pdf" download className="cursor-pointer" title="Download resume">
          <Download className="icon" />
        </a>
      </div>
      <div className="resume-main flex-1 overflow-y-auto bg-gray-100">
        <object data="/files/resume.pdf" type="application/pdf" className="w-full h-full">
          <iframe
            src="/files/resume.pdf"
            className="w-full h-full border-none"
            title="Resume PDF"
          />
        </object>
      </div>
    </div>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");
export default ResumeWindow;
