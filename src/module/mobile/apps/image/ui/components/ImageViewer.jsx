import { Heart } from "lucide-react";
import useWindowsStore from "@store/window";

const ImageViewer = ({ imageUrl, imageMobUrl, name, id, isMobile }) => {
  const { favorites, toggleFavorite } = useWindowsStore();
  const isFavorite = id ? favorites.includes(id) : false;

  if (isMobile) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          overflow: "hidden",
          position: "relative",
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
              }}
            />
            {id && (
              <button
                onClick={() => toggleFavorite(id)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  padding: 8,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(4px)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
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
