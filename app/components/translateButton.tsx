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
        isMessageUpdating ? "bg-gray-400" : "bg-blue-500"
      } text-white font-bold rounded-lg text-lg self-end mt-auto`}
      onClick={handleTranslate}
      disabled={isMessageUpdating}
    >
      TRANSLATE
    </button>
  );
};

export default TranslateButton;
