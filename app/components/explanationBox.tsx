const ExplanationBox = ({
  type,
  text,
  setText,
}: {
  type: "highlight" | "explanation";
  text: string;
  setText: (text: string) => void;
}) => {
  return (
    <textarea
      id={type === "highlight" ? "highlight" : "explanation"}
      name={type === "highlight" ? "highlight" : "explanation"}
      className="bg-gray-900 text-white border-none p-4 h-14 flex-grow-0 overflow-auto rounded-md w-full resize-none"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={
        type === "highlight"
          ? "Highlight text..."
          : "Explanation appears here..."
      }
    ></textarea>
  );
};

export default ExplanationBox;
