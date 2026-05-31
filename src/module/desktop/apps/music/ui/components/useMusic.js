import { useState, useEffect, useRef, useCallback } from "react";
import useWindowsStore from "@store/window";
import { getCoverColor, getCoverEmoji } from "./musicData";

const useMusic = () => {
  const { music, setMusicState, focusWindow } = useWindowsStore();
  const activeTrack = music.activeTrack;
  const isPlaying = music.isPlaying;
  const volume = music.volume;
  const isMuted = music.isMuted;

  const [tracks, setTracks] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Browse");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_JIOSAAVN_API_URL ||
          "https://jiosaavn-apix.arcadopredator.workers.dev";
        let query = "Bollywood Hits";
        if (searchQuery.trim() !== "") {
          query = searchQuery;
        } else {
          switch (activeCategory) {
            case "Browse":
              query = "Bollywood Hits";
              break;
            case "Listen Now":
              query = "Arijit Singh Hits";
              break;
            case "Hindi Music":
              query = "New Hindi Songs";
              break;
            case "English Music":
              query = "Imagine Dragons";
              break;
            case "Recently Added":
              query = "Latest Hits";
              break;
            case "Artists":
              query = "Top Artists";
              break;
            case "Albums":
              query = "Top Albums";
              break;
            case "Songs":
              query = "Popular Songs";
              break;
            default:
              query = "Bollywood Hits";
          }
        }
        const res = await fetch(
          `${apiBase}/api/search/songs?query=${encodeURIComponent(query)}&limit=25`,
        );
        const resultData = await res.json();
        if (resultData.success && resultData.data && resultData.data.results) {
          const formattedTracks = resultData.data.results.map((track, index) => {
            const downloadUrls = track.downloadUrl || [];
            const audioUrl =
              downloadUrls.length > 0 ? downloadUrls[downloadUrls.length - 1]?.url : "";
            const images = track.image;
            let coverUrl = "";
            if (typeof images === "string") {
              coverUrl = images;
            } else if (Array.isArray(images) && images.length > 0) {
              const lastImg = images[images.length - 1];
              coverUrl =
                typeof lastImg === "string" ? lastImg : lastImg?.url || lastImg?.link || "";
            }
            return {
              id: track.id,
              title: track.name,
              artist:
                track.artists?.primary?.map((a) => a.name).join(", ") ||
                track.label ||
                "Unknown Artist",
              album: track.album?.name || "Single",
              duration: track.duration,
              coverColor: getCoverColor(index),
              coverText: getCoverEmoji(track.name),
              coverUrl: coverUrl,
              url: audioUrl,
              language: track.language,
            };
          });
          setTracks(formattedTracks);
        } else {
          setTracks([]);
        }
      } catch (err) {
        console.error("Failed to fetch JioSaavn tracks:", err);
        setTracks([]);
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => {
      fetchTracks();
    }, 450);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (tracks.length > 0 && activeTrack.id === 0) {
      setMusicState({ activeTrack: tracks[0] });
    }
  }, [tracks, activeTrack, setMusicState]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current && activeTrack.url) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log("Audio playback blocked or interrupted:", err);
          setMusicState({ isPlaying: false });
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack, setMusicState]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = Math.round(audioRef.current.duration);
      if (duration && !isNaN(duration)) {
        setMusicState({ activeTrack: { ...activeTrack, duration } });
      }
    }
  };

  const handleAudioEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => console.log(err));
      }
    } else {
      handleNext();
    }
  };

  const handleSelectTrack = (track) => {
    setMusicState({ activeTrack: track, isPlaying: true });
    setCurrentTime(0);
  };

  const handlePlayPause = () => {
    if (activeTrack.url) {
      setMusicState({ isPlaying: !isPlaying });
    }
  };

  const handleNext = useCallback(() => {
    const currentList = tracks;
    if (currentList.length === 0) return;
    let nextTrack;
    if (isShuffle) {
      const randIdx = Math.floor(Math.random() * currentList.length);
      nextTrack = currentList[randIdx];
    } else {
      const currentIdx = currentList.findIndex((t) => t.id === activeTrack.id);
      if (currentIdx === -1) {
        nextTrack = currentList[0];
      } else {
        nextTrack = currentList[(currentIdx + 1) % currentList.length];
      }
    }
    setMusicState({ activeTrack: nextTrack });
    setCurrentTime(0);
  }, [tracks, activeTrack, isShuffle, setMusicState, setCurrentTime]);

  const handlePrev = useCallback(() => {
    const currentList = tracks;
    if (currentList.length === 0) return;
    const currentIdx = currentList.findIndex((t) => t.id === activeTrack.id);
    const prevIdx =
      currentIdx === -1
        ? currentList.length - 1
        : (currentIdx - 1 + currentList.length) % currentList.length;
    setMusicState({ activeTrack: currentList[prevIdx] });
    setCurrentTime(0);
  }, [tracks, activeTrack, setMusicState, setCurrentTime]);

  useEffect(() => {
    const onNext = () => handleNext();
    const onPrev = () => handlePrev();
    const audio = audioRef.current;
    window.addEventListener("macos-portfolio-next-track", onNext);
    window.addEventListener("macos-portfolio-prev-track", onPrev);
    return () => {
      window.removeEventListener("macos-portfolio-next-track", onNext);
      window.removeEventListener("macos-portfolio-prev-track", onPrev);
      if (audio) {
        audio.pause();
      }
    };
  }, [tracks, activeTrack, isShuffle, handleNext, handlePrev]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleProgressChange = (e) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return {
    tracks,
    setTracks,
    activeTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    setCurrentTime,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    isLoading,
    audioRef,
    searchInputRef,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleAudioEnded,
    handleSelectTrack,
    handlePlayPause,
    handleNext,
    handlePrev,
    formatTime,
    handleProgressChange,
    focusWindow,
    setMusicState,
  };
};

export default useMusic;
