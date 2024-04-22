import { franc, francAll } from "franc-min";
// franc-min detects fewer languages but is more accurate with shorter texts
// import { franc, francAll } from "franc";
import * as langs from "langs";

export const detectLanguage = (text: string) => {
  const languageCode = detectLanguageCode(text);
  return getLanguageName(languageCode);
};

export const detectLanguageCode = (text: string) => {
  return franc(text);
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
