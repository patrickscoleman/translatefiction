"use client";

import { useContext } from "react";
import { MessagesContext } from "@/app/context/messages";

const ExplainButton = ({ handleExplain }: { handleExplain: () => void }) => {
  const { isMessageUpdating } = useContext(MessagesContext);

  return (
    <button
      className={`px-8 py-4 ${
        isMessageUpdating ? "bg-gray-400" : "bg-indigo-500"
      } text-white font-bold rounded-lg text-lg self-end mt-auto`}
      onClick={handleExplain}
      disabled={isMessageUpdating}
    >
      EXPLAIN<span className="hidden ml-1 md:inline">⌘\</span>
    </button>
  );
};

export default ExplainButton;
