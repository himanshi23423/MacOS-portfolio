import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowsStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    favorites: [],

    toggleFavorite: (id) =>
      set((state) => {
        if (state.favorites.includes(id)) {
          state.favorites = state.favorites.filter((fId) => fId !== id);
        } else {
          state.favorites.push(id);
        }
      }),

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.isMinimized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMinimized = true;
      }),
    unminimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
    toggleMaximize: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMaximized = !win.isMaximized;
      }),
  }))
);

export default useWindowsStore;
