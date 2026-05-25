import WindowControls from "#components/WindowControls";
import { techStack } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import { Check, Flag } from "lucide-react";

const Terminal = () => {
  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2">
        <WindowControls target="terminal" />
        <h2 className="flex-1 text-center text-sm font-bold text-gray-500">Tech Stack</h2>
      </div>
      <div className="techstack flex-1 overflow-y-auto p-4 @sm:p-6">
        <p>
          <span className="font-bold">@kuldeep % </span>
          show tech stack
        </p>
        <div className="label hidden @sm:flex items-center ml-10 mt-6 text-gray-500">
          <p className="w-32 font-bold">Category</p>
          <p className="font-bold">Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex flex-col @sm:flex-row @sm:items-center py-3 border-b border-dashed border-gray-200 last:border-0 gap-2 @sm:gap-0">
              <div className="flex items-center">
                <Check className="check text-green-600 hidden @sm:block w-5 mr-5" size={20} />
                <h3 className="font-semibold text-green-600 w-32 @sm:ml-0 ml-2">{category}</h3>
              </div>
              <ul className="flex flex-wrap items-center gap-2 ml-2 @sm:ml-0">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote mt-6 text-green-600 space-y-1">
          <p className="flex items-center gap-2">
            <Check size={18} /> 5 of 5 stacks loaded successfully(100%)
          </p>
          <p className="flex items-center gap-2 text-black">
            <Flag size={14} fill="black" /> Render time:6ms
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");
export default TerminalWindow;
