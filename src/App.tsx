import MessageInput from "./components/MessageInput";
import AnalysisResult from "./components/AnalysisResult";
import { useScamAnalyzer } from "./hooks/useScamAnalyzer";

function App() {
  const { analyze, result, loading } = useScamAnalyzer();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>🛡️ AI Shield</h1>
      <p>Paste any message and detect scams</p>

      <MessageInput onAnalyze={analyze} isLoading={loading} />
      {result && <AnalysisResult result={result} />}
    </div>
  );
}

export default App;
