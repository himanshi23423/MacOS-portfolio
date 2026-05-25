import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import { Download } from "lucide-react";
import { pdfjs ,Document,Page} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 flex items-center justify-between">
        <WindowControls target={"resume"} />
        <h2>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <div className="resume-main flex-1 overflow-y-auto flex justify-center bg-gray-100">
        <Document file="files/resume.pdf">
          <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
        </Document>
      </div>
    </div>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");
export default ResumeWindow;
