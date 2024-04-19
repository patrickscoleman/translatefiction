export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      <h1 className="text-4xl font-bold mb-8">Translate Fiction</h1>
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex flex-col flex-1">
          <textarea
            className="resize-none p-4 h-48 overflow-auto border rounded-md"
            placeholder="Enter text to translate..."
          ></textarea>
          <p className="mt-2">Language: none detected, enter more text</p>
        </div>
        <div className="flex flex-col flex-1">
          <textarea
            className="resize-none p-4 h-48 overflow-auto border rounded-md"
            placeholder="Translation appears here..."
          ></textarea>
          <p className="mt-2">Language: none detected, enter more text</p>
        </div>
      </div>
      <button className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-lg">
        TRANSLATE
      </button>
    </main>
  );
}
