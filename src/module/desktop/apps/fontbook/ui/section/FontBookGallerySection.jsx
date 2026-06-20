import FontList from "../components/FontList";
import FontPreview from "../components/FontPreview";

const FontBookGallerySection = ({
  filteredFonts,
  activeFont,
  setActiveFont,
  fontSize,
  setFontSize,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  specimenText,
  setSpecimenText,
}) => (
  <>
    <FontList filteredFonts={filteredFonts} activeFont={activeFont} setActiveFont={setActiveFont} />
    <FontPreview
      activeFont={activeFont}
      fontSize={fontSize}
      setFontSize={setFontSize}
      isBold={isBold}
      setIsBold={setIsBold}
      isItalic={isItalic}
      setIsItalic={setIsItalic}
      specimenText={specimenText}
      setSpecimenText={setSpecimenText}
    />
  </>
);

export default FontBookGallerySection;
