import { create } from "zustand";

const useWidgetsStore = create(() => ({
  // Static widget — no edit mode, no persistence needed
  widgetEnabled: true,
}));

export default useWidgetsStore;
