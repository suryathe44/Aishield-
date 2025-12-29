import { useState } from "react";

interface Props {
  onAnalyze: (msg: string) => Promise<void>;
  isLoading: boolean;
}

export default function MessageInput({ onAnalyze, isLoading }: Props) {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim()) onAnalyze(text);
      }}
    >
      <textarea
        placeholder="Paste message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        style={{ marginTop: 10, background: "#22c55e" }}
      >
        {isLoading ? "Analyzing..." : "Check Safety"}
      </button>
    </form>
  );
}
