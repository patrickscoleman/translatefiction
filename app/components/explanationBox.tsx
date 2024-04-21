const ExplanationBox = ({
  type,
  text,
}: {
  type: "highlight" | "explanation";
  text: string;
}) => {
  return (
    <textarea
      readOnly={true}
      className="bg-gray-800 text-white border-none p-4 h-14 flex-grow-0 overflow-auto rounded-md w-full resize-none"
      value={text}
      placeholder={
        type === "highlight"
          ? "Highlight text..."
          : "Explanation appears here..."
      }
    ></textarea>
  );
};

export default ExplanationBox;
