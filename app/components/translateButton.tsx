const TranslateButton = ({
  sourceText,
  setTargetText,
}: {
  sourceText: string;
  setTargetText: (text: string) => void;
}) => (
  <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-lg self-end mt-auto">
    TRANSLATE
  </button>
);

export default TranslateButton;
