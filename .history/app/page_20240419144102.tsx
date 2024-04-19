export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-24 overflow-hidden max-w-6xl mx-auto w-full">
      <h1 className="text-4xl font-bold mb-8 self-start">Translate Fiction</h1>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mb-4 w-full">
        <div className="flex flex-col flex-1">
          <textarea
            className="resize-none p-4 flex-1 overflow-auto border rounded-md w-full"
            placeholder="Enter text to translate..."
          ></textarea>
          <p className="mt-2">Language: none detected, enter more text</p>
        </div>
        <div className="flex flex-col flex-1">
          <textarea
            className="resize-none p-4 flex-1 overflow-auto border rounded-md w-full"
            placeholder="Translation appears here..."
          ></textarea>
          <p className="mt-2">Language: none detected, enter more text</p>
        </div>
      </div>
      <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-lg self-end mt-auto">
        TRANSLATE
      </button>
    </main>
  );
}
