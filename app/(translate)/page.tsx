import TextBox from "../components/textBox";
import TranslateButton from "../components/translateButton";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-16 overflow-hidden max-w-6xl mx-auto w-full">
      <h1 className="text-4xl font-bold mb-8 self-start">Translate Fiction</h1>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mb-4 w-full">
        <TextBox type="source" />
        <TextBox type="target" />
      </div>
      <TranslateButton />
    </main>
  );
}
