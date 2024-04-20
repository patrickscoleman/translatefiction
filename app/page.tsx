"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import TextBox from "@/app/components/textBox";
import TranslateButton from "@/app/components/translateButton";
import { Message } from "@/app/lib/validators/message";

export default function Home() {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
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
    const message = {
      id: nanoid(),
      isSource: true,
      text: sourceText,
    };

    sendMessage(message);
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
