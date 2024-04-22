"use client";

const ClearButton = ({ handleClear }: { handleClear: () => void }) => {
  return (
    <button
      className={`px-8 py-4 bg-gray-800 text-white font-bold rounded-lg text-lg self-end mt-auto`}
      onClick={handleClear}
    >
      CLEAR<span className="hidden ml-1 md:inline">⌘⌥⌫</span>
    </button>
  );
};

export default ClearButton;
