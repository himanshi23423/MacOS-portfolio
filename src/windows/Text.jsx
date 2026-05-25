import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowsStore from "#store/window";

const Text = () => {
  const { windows } = useWindowsStore();
  const data = windows.txtfile?.data;

  const { name = "Document", image = "", subtitle = "", description = [] } = data || {};
  return (
    <div className="flex flex-col h-full w-full @container bg-white rounded-xl overflow-hidden">
      <div id="window-header" className="shrink-0 !bg-gray-50 !border-b-[#d1d1d1] !px-4 !py-2 flex items-center justify-between">
        <WindowControls target={"txtfile"} />
        <h2 className="flex-1 text-center font-bold text-gray-500">{name}</h2>
      </div>
      <div className="p-5 space-y-6 bg-white">
        {image ? (
          <div>
            <img src={image} alt={name} className="w-full h-auto rounded" />
          </div>
        ) : null}
        {subtitle ? (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
const TextWindow = windowWrapper(Text, "txtfile");
export default TextWindow;
