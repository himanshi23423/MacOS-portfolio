const TextEditor = ({ image, name, subtitle, description }) => (
  <div className="p-5 space-y-6 bg-white">
    {image ? (
      <div>
        <img src={image} alt={name} className="w-full h-auto rounded" />
      </div>
    ) : null}
    {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}

    {Array.isArray(description) && description.length > 0 ? (
      <div className="space-y-3 leading-relaxed text-base text-gray-800">
        {description.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    ) : null}
  </div>
);

export default TextEditor;
