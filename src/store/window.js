import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowsStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    favorites: [],
    music: {
      activeTrack: {
        id: 0,
        title: "Select a Song",
        artist: "JioSaavn Music",
        album: "Streaming",
        duration: 0,
        coverColor: "from-zinc-400 to-zinc-600",
        coverText: "🎵",
        coverUrl: "",
        url: ""
      },
      isPlaying: false,
      volume: 72,
      isMuted: false
    },
    isSiriOpen: false,
    systemSettings: {
      wifi: true,
      bluetooth: true,
      airdrop: false,
      darkMode: true,
      focusMode: false,
      brightness: 100,
      soundLevel: 45,
      nightLight: false,
      firewall: true,
      activeWifiNetwork: "Home Network"
    },

    updateSystemSetting: (key, value) =>
      set((state) => {
        state.systemSettings[key] = value;
      }),

    toggleSystemSetting: (key) =>
      set((state) => {
        state.systemSettings[key] = !state.systemSettings[key];
      }),

    setMusicState: (musicData) =>
      set((state) => {
        state.music = { ...state.music, ...musicData };
      }),

    setSiriOpen: (isOpen) =>
      set((state) => {
        state.isSiriOpen = isOpen;
      }),

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
