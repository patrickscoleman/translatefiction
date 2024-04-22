import { useEffect } from "react";
import {
  detectLanguage,
  getLanguageName,
} from "@/app/helpers/languageDetector";

const TextBox = ({
  type,
  text,
  setText,
  language,
  setLanguage,
}: {
  type: "source" | "target";
  text: string;
  setText: (text: string) => void;
  language?: string;
  setLanguage?: (language: string) => void;
}) => {
  useEffect(() => {
    if (type === "source" && setLanguage) {
      const detect = async () => {
        if (text) {
          const sampleText = text.substring(0, 100);
          const detectedLanguage = await detectLanguage(sampleText);
          const languageName = getLanguageName(detectedLanguage);
          setLanguage(languageName);
        } else {
          setLanguage("none detected");
        }
      };

      detect();
    }
  }, [text, type, setLanguage]);
  return (
    <div className="flex flex-col flex-1">
      <textarea
        id={type === "source" ? "sourceText" : "targetText"}
        name={type === "source" ? "sourceText" : "targetText"}
        className="text-black resize-none p-4 flex-1 overflow-auto border rounded-md w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          type === "source"
            ? "Enter text to translate..."
            : "Editable translation appears here..."
        }
      ></textarea>
      <p className="my-2">
        {type === "source"
          ? `Language: ${language || "none detected"}`
          : "Language: English"}
      </p>
    </div>
  );
};

export default TextBox;
