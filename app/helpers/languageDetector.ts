import { franc, francAll } from "franc";
import * as langs from "langs";

export const detectLanguage = (text: string) => {
  const languageCode = franc(text);
  return languageCode;
};

export const getLanguageName = (code: string): string => {
  return langs.where("3", code)?.name || "Unknown";
};

export const detectAllPossibleLanguages = (text: string) => {
  const detections = francAll(text);
  return detections.map((detection) => ({
    languageCode: detection[0],
    languageName: getLanguageName(detection[0]),
    probability: detection[1],
  }));
};
