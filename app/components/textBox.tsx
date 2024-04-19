"use client";

const TextBox = ({
  type,
  text,
  setText,
}: {
  type: "source" | "target";
  text: string;
  setText: (text: string) => void;
}) => {
  return (
    <div className="flex flex-col flex-1">
      <textarea
        className="text-black resize-none p-4 flex-1 overflow-auto border rounded-md w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          type === "source"
            ? "Enter text to translate..."
            : "Editable translation appears here..."
        }
      ></textarea>
      <p className="mt-2">
        {type === "source" ? "Language: none detected" : "Language: English"}
      </p>
    </div>
  );
};

export default TextBox;
