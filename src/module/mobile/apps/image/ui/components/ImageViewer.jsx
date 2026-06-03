import React, { useState } from "react";
import { Heart } from "lucide-react";
import useWindowsStore from "@store/window";
import { gallery } from "@constants";

const ImageViewer = ({ imageUrl, imageMobUrl, name, id, isMobile }) => {
  const { favorites, toggleFavorite, openWindow } = useWindowsStore();
  const isFavorite = id ? favorites.includes(id) : false;

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const currentIndex = gallery.findIndex((item) => item.id === id);

  const goToNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % gallery.length;
    const nextPhoto = gallery[nextIndex];
    openWindow("imgfile", {
      id: nextPhoto.id,
      name: "Gallery image",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: nextPhoto.img,
    });
  };

  const goToPrev = () => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    const prevPhoto = gallery[prevIndex];
    openWindow("imgfile", {
      id: prevPhoto.id,
      name: "Gallery image",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: prevPhoto.img,
    });
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
    // Reset touch coordinates
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (isMobile) {
    return (
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          overflow: "hidden",
          position: "relative",
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageMobUrl ? imageMobUrl : imageUrl}
              alt={name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                pointerEvents: "none", // Prevent native drag behavior interfering with swiping
              }}
            />
            {id && (
              <button
                onClick={() => toggleFavorite(id)}
                style={{
                  position: "absolute",
                  bottom: 30,
                  right: 30,
                  padding: 10,
                  borderRadius: "50%",
                  background: isFavorite ? "rgba(255, 59, 48, 0.15)" : "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isFavorite
                    ? "1px solid rgba(255, 59, 48, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  transition: "all 0.25s ease",
                }}
              >
                <Heart
                  size={20}
                  fill={isFavorite ? "#ff3b30" : "transparent"}
                  color={isFavorite ? "#ff3b30" : "#1c1c1e"}
                  strokeWidth={2}
                />
              </button>
            )}
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex items-center justify-center bg-gray-50 p-2 @sm:p-4 relative">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain drop-shadow-md rounded-md"
          />
          {id && (
            <button
              onClick={() => toggleFavorite(id)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-sm shadow-xl z-10"
            >
              <Heart
                size={24}
                fill={isFavorite ? "#ff3b30" : "transparent"}
                color={isFavorite ? "#ff3b30" : "white"}
                strokeWidth={2}
              />
            </button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default ImageViewer;
