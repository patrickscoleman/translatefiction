"use client";

import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import TextBox from "@/app/components/textBox";
import ExplanationBox from "@/app/components/explanationBox";
import TranslateButton from "@/app/components/translateButton";
import ExplainButton from "@/app/components/explainButton";
import ClearButton from "@/app/components/clearButton";
import { Message } from "@/app/lib/validators/message";
import { MessagesContext } from "@/app/context/messages";
import {
  detectLanguage,
  getLanguageName,
} from "@/app/helpers/languageDetector";

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("none detected");
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

  const abortControllerRef = useRef<AbortController | null>(null);

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: Message) => {
      setIsMessageUpdating(true);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
        signal,
      });

      return { stream: response.body, message };
    },
    onSuccess: async ({ stream, message }) => {
      if (!stream) throw new Error("No stream found");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        messageType: message.messageType,
        isSource: false,
        text: "",
      };

      addMessage(responseMessage);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done && !abortControllerRef.current?.signal.aborted) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
        if (responseMessage.messageType === "translation") {
          setTargetText((prev) => prev + chunkValue);
        } else if (responseMessage.messageType === "explanation") {
          setExplanation((prev) => prev + chunkValue);
        }
      }

      // clean up
      setIsMessageUpdating(false);
    },
  });

  const handleTranslate = useCallback(() => {
    setTargetText("");

    const message: Message = {
      id: nanoid(),
      messageType: "translation",
      isSource: true,
      text: `Please translate the following text to English. If you receive a message in English, please ask the user to enter text in another language to translate. Text: ${sourceText}`,
    };

    sendMessage(message);
  }, [sourceText, sendMessage]);

  const handleExplain = useCallback(() => {
    setExplanation("");

    // If the highlighted text is from the translation, provide an explanation in the source language
    // Otherwise, provide an explanation in English
    const shouldTranslateBackToSource = targetText.includes(highlight);

    const message: Message = shouldTranslateBackToSource
      ? {
          id: nanoid(),
          messageType: "explanation",
          isSource: true,
          text: `You must respond in ${sourceLanguage} ONLY. Please provide all possible ${sourceLanguage} translations of the following English word or phrase. Only reply with the translations. Be concise. Don't use newlines. Word: ${highlight}`,
        }
      : {
          id: nanoid(),
          messageType: "explanation",
          isSource: true,
          text: `Please provide all possible English translations of the following ${sourceLanguage} word or phrase. Only reply with the translations. Be concise. Don't use newlines. Word: ${highlight}`,
        };

    sendMessage(message);
  }, [highlight, sourceLanguage, targetText, sendMessage]);

  const handleClear = useCallback(() => {
    setSourceText("");
    setTargetText("");
    setHighlight("");
    setExplanation("");

    abortControllerRef.current?.abort();
    setIsMessageUpdating(false);
  }, [setIsMessageUpdating]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (typeof window !== "undefined") {
        const selectedText = window.getSelection()?.toString();
        if (selectedText && selectedText.length > 0) {
          setHighlight(selectedText);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.metaKey) {
        handleTranslate();
      } else if (event.key === "\\" && event.metaKey) {
        handleExplain();
      } else if (event.key === "Backspace" && event.altKey && event.metaKey) {
        handleClear();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleTranslate, handleExplain, handleClear]);

  return (
    <main className="flex flex-col min-h-screen p-8 overflow-hidden max-w-6xl mx-auto w-full">
      <h1 className="text-4xl font-bold mb-8 self-start">Translate Fiction</h1>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mb-4 w-full">
        <div className="flex flex-1 flex-col w-full">
          <TextBox
            type="source"
            text={sourceText}
            setText={setSourceText}
            language={sourceLanguage}
            setLanguage={setSourceLanguage}
          />
          <ExplanationBox
            type="highlight"
            text={highlight}
            setText={setHighlight}
          />
        </div>
        <div className="flex flex-1 flex-col w-full">
          <TextBox type="target" text={targetText} setText={setTargetText} />
          <ExplanationBox
            type="explanation"
            text={explanation}
            setText={setExplanation}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <div className="hidden md:inline">
          <ClearButton handleClear={handleClear} />
        </div>
        <ExplainButton handleExplain={handleExplain} />
        <TranslateButton handleTranslate={handleTranslate} />
      </div>
    </main>
  );
}
