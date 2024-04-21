"use client";

import { useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import TextBox from "@/app/components/textBox";
import ExplanationBox from "@/app/components/explanationBox";
import TranslateButton from "@/app/components/translateButton";
import { Message } from "@/app/lib/validators/message";
import { MessagesContext } from "@/app/context/messages";

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [highlight, setHighlight] = useState("");
  const [explanation, setExplanation] = useState("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: Message) => {
      setIsMessageUpdating(true);
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
      });

      return response.body;
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream found");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        messageType: "translation",
        isSource: false,
        text: "",
      };

      addMessage(responseMessage);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
        setTargetText((prev) => prev + chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);
    },
  });

  const handleTranslate = () => {
    const message: Message = {
      id: nanoid(),
      messageType: "translation",
      isSource: true,
      text: `Please translate the following text to English. If you receive a message in English, please ask the user to enter text in another language to translate. Text: ${sourceText}`,
    };

    sendMessage(message);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (typeof window !== "undefined") {
        const selectedText = window?.getSelection()?.toString();
        if (selectedText && selectedText.length > 0) {
          setHighlight(selectedText);
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <main className="flex flex-col min-h-screen p-8 overflow-hidden max-w-6xl mx-auto w-full">
      <h1 className="text-4xl font-bold mb-8 self-start">Translate Fiction</h1>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mb-4 w-full">
        <div className="flex flex-1 flex-col w-full">
          <TextBox type="source" text={sourceText} setText={setSourceText} />
          <ExplanationBox type="highlight" text={highlight} />
        </div>
        <div className="flex flex-1 flex-col w-full">
          <TextBox type="target" text={targetText} setText={setTargetText} />
          <ExplanationBox type="explanation" text={explanation} />
        </div>
      </div>
      <TranslateButton handleTranslate={handleTranslate} />
    </main>
  );
}
