import { create } from "zustand";

const useTimeStore = create((set) => {
  if (typeof window !== "undefined") {
    setInterval(() => {
      set({ time: new Date() });
    }, 1000);
  }

  return {
    time: new Date(),
  };
});

export default useTimeStore;
