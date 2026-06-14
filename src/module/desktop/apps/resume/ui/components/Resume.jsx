import React, { useState, useEffect, useRef } from "react";
import WindowControls from "@components/WindowControls";
import windowWrapper from "@hoc/windowWrapper";
import { Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure pdfjs worker to render the PDF properly via CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [containerWidth, setContainerWidth] = useState(720);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Fit container width dynamically
        const width = Math.min(containerRef.current.clientWidth - 40, 720);
        setContainerWidth(width);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div
        id="window-header"
        className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 flex items-center justify-between gap-4 select-none"
      >
        <div className="flex items-center gap-4">
          <WindowControls target={"resume"} />
          <span className="text-xs font-semibold text-gray-500">Resume.pdf</span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-3 text-gray-500">
          <div className="flex items-center bg-gray-200/60 rounded px-1.5 py-0.5 gap-2 border border-gray-300/30">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="p-1 hover:bg-gray-300/60 rounded transition disabled:opacity-40"
              title="Zoom Out"
            >
              <ZoomOut size={13} className="text-gray-600" />
            </button>
            <span className="text-[10px] font-semibold min-w-[32px] text-center text-gray-600">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 2.0}
              className="p-1 hover:bg-gray-300/60 rounded transition disabled:opacity-40"
              title="Zoom In"
            >
              <ZoomIn size={13} className="text-gray-600" />
            </button>
          </div>

          <div className="h-4 w-px bg-gray-300" />

          <button
            onClick={handleRotate}
            className="p-1.5 hover:bg-gray-200/60 rounded transition text-gray-600 hover:text-gray-800"
            title="Rotate Clockwise"
          >
            <RotateCw size={13} />
          </button>

          <a
            href="/files/resume.pdf"
            download
            className="p-1.5 hover:bg-gray-200/60 rounded transition text-gray-600 hover:text-gray-800"
            title="Download PDF"
          >
            <Download size={13} />
          </a>
        </div>
      </div>

      <div ref={containerRef} className="resume-main flex-1 overflow-y-auto bg-gray-100">
        <div className="flex flex-col items-center justify-center min-h-full py-6 px-4">
          <Document
            file="/files/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="p-4 text-gray-500">Loading Resume...</div>}
            error={<div className="p-4 text-rose-500">Failed to load PDF.</div>}
            className="flex flex-col items-center"
          >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div
                key={`page_container_${index + 1}`}
                className="shadow-md rounded-lg overflow-hidden my-3 bg-white transition-transform duration-300"
              >
                <Page
                  pageNumber={index + 1}
                  width={containerWidth}
                  scale={scale}
                  rotate={rotation}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");
export default ResumeWindow;
