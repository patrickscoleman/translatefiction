"use client";

import { useContext } from "react";
import { MessagesContext } from "@/app/context/messages";

const TranslateButton = ({
  handleTranslate,
}: {
  handleTranslate: () => void;
}) => {
  const { isMessageUpdating } = useContext(MessagesContext);

  return (
    <button
      className={`px-8 py-4 ${
        isMessageUpdating
          ? "bg-gray-400 hover:bg-gray-400"
          : "bg-blue-500 hover:bg-blue-400"
      } text-white font-bold rounded-lg text-lg self-end mt-auto transition-colors duration-150`}
      onClick={handleTranslate}
      disabled={isMessageUpdating}
    >
      TRANSLATE<span className="hidden ml-1 md:inline">⌘↵</span>
    </button>
  );
};

export default TranslateButton;
