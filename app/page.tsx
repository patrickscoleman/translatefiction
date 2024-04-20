"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import TextBox from "./components/textBox";
import TranslateButton from "./components/translateButton";
import { TranslationText } from "./lib/validators/translationText";

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  const { mutate: translate, isPending } = useMutation({
    mutationFn: async (translationText: TranslationText) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: sourceText }),
      });

      return response.body;
    },
    onSuccess: () => {
      console.log("Success");
    },
  });

  const handleTranslate = () => {
    const text = {
      id: nanoid(),
      isSource: true,
      text: sourceText,
    };

    translate(text);
  };

  return (
    <main className="flex flex-col min-h-screen p-16 overflow-hidden max-w-6xl mx-auto w-full">
      <h1 className="text-4xl font-bold mb-8 self-start">Translate Fiction</h1>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mb-4 w-full">
        <TextBox type="source" text={sourceText} setText={setSourceText} />
        <TextBox type="target" text={targetText} setText={setTargetText} />
      </div>
      <TranslateButton handleTranslate={handleTranslate} />
    </main>
  );
}
