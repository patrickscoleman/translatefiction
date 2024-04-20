"use client";

const TranslateButton = ({
  handleTranslate,
}: {
  handleTranslate: () => void;
}) => (
  <button
    className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-lg self-end mt-auto"
    onClick={handleTranslate}
  >
    TRANSLATE
  </button>
);

export default TranslateButton;
