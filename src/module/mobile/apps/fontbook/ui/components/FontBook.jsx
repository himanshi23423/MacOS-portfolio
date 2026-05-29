import { useState } from "react";
import windowWrapper from "#hoc/windowWrapper";
import INITIAL_FONTS from "./fontData";
import FontBookSection from "../section/FontBookSection";

const FontBook = () => {
  const [activeCategory, setActiveCategory] = useState("All Fonts");
  const [fonts, setFonts] = useState(INITIAL_FONTS);
  const [activeFont, setActiveFont] = useState(INITIAL_FONTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(36);
  const [googleFontInput, setGoogleFontInput] = useState("");
  const [specimenText, setSpecimenText] = useState(
    "The quick brown fox jumps over the lazy dog.\nAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz\n1234567890"
  );
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleInstallFont = () => {
    const name = googleFontInput.trim();
    if (!name) return;

    if (fonts.some(f => f.name.toLowerCase() === name.toLowerCase())) {
      alert("This font is already loaded in Font Book!");
      return;
    }

    const formattedName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const googleFontUrlName = formattedName.replace(/ /g, "+");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${googleFontUrlName}&display=swap`;

    link.onerror = () => {
      alert(`Could not load font "${formattedName}" from Google Fonts. Please verify the family name.`);
    };

    document.head.appendChild(link);

    const newFont = {
      name: formattedName,
      category: "Google Fonts",
      designer: "Google Fonts Contributor",
      desc: "Dynamically installed web font loaded directly via Google Fonts API."
    };

    setFonts(prev => [...prev, newFont]);
    setActiveFont(newFont);
    setGoogleFontInput("");
  };

  const filteredFonts = fonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesCategory = searchQuery.trim() ? true : (activeCategory === "All Fonts" || font.category === activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <FontBookSection
      fonts={fonts}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      googleFontInput={googleFontInput}
      setGoogleFontInput={setGoogleFontInput}
      handleInstallFont={handleInstallFont}
      filteredFonts={filteredFonts}
      activeFont={activeFont}
      setActiveFont={setActiveFont}
      fontSize={fontSize}
      setFontSize={setFontSize}
      isBold={isBold}
      setIsBold={setIsBold}
      isItalic={isItalic}
      setIsItalic={setIsItalic}
      specimenText={specimenText}
      setSpecimenText={setSpecimenText}
    />
  );
};

const FontBookWindow = windowWrapper(FontBook, "font");
export default FontBookWindow;
