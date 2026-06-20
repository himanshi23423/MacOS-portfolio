import { X, Phone, Video, Trash2 } from "lucide-react";
import { DIALPAD_KEYS } from "../../data";

const CallDialPad = ({
  dialNumber,
  onDialPress,
  onBackspace,
  onClear,
  onInitiateCall,
  onInputChange,
}) => {
  return (
    <div className="flex-1 flex flex-col p-4 justify-between min-h-0 overflow-y-auto thin-scrollbar">
      <div className="flex items-center justify-between bg-gray-200/50 border border-gray-300/20 rounded-xl p-3 mb-4 shrink-0">
        <input
          type="text"
          value={dialNumber}
          onChange={(e) => {
            const val = e.target.value;
            if (/^[0-9*#+]*$/.test(val)) {
              onInputChange(val);
            }
          }}
          placeholder="Enter number"
          className="w-full bg-transparent font-bold text-base text-center outline-none border-none text-gray-800 tracking-wide"
        />
        {dialNumber && (
          <button
            onClick={onBackspace}
            className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
            title="Backspace"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-[200px] mx-auto">
        {DIALPAD_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => onDialPress(key)}
            className="aspect-square rounded-full bg-white hover:bg-gray-50 active:bg-gray-200 flex items-center justify-center transition-all select-none border border-gray-200/60 shadow-sm text-lg font-bold text-gray-800"
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 pt-6 shrink-0">
        <button
          onClick={() => {
            if (dialNumber) {
              onInitiateCall(dialNumber, "audio");
            }
          }}
          disabled={!dialNumber}
          className="w-12 h-12 bg-gray-200 hover:bg-gray-300 active:scale-95 disabled:bg-gray-150 disabled:text-gray-400 disabled:pointer-events-none rounded-full flex items-center justify-center text-gray-600 transition-all shadow-md"
          title="Audio FaceTime"
        >
          <Phone
            className={`w-5 h-5 ${dialNumber ? "fill-gray-600 text-transparent" : "fill-gray-300 text-transparent"}`}
          />
        </button>
        <button
          onClick={() => {
            if (dialNumber) {
              onInitiateCall(dialNumber, "video");
            }
          }}
          disabled={!dialNumber}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 active:scale-95 disabled:bg-gray-150 disabled:text-gray-400 disabled:pointer-events-none rounded-full flex items-center justify-center text-white transition-all shadow-md"
          title="Video FaceTime"
        >
          <Video
            className={`w-5 h-5 ${dialNumber ? "fill-white text-transparent" : "fill-gray-300 text-transparent"}`}
          />
        </button>
        {dialNumber && (
          <button
            onClick={onClear}
            className="p-3 bg-red-100 hover:bg-red-200 rounded-full text-red-500 transition-colors"
            title="Clear All"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CallDialPad;
