const TextBox = ({ type }: { type: "source" | "target" }) => (
  <div className="flex flex-col flex-1">
    <textarea
      className="resize-none p-4 flex-1 overflow-auto border rounded-md w-full"
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

export default TextBox;
