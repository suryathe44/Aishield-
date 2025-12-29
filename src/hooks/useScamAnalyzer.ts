import { useState } from "react";
import { toast } from "sonner";

interface AnalysisResult {
  classification: "SAFE" | "WARNING" | "DANGER";
  confidence: number;
  summary: string;
  explanation: string;
  redFlags: string[];
  tips: string[];
}

export const useScamAnalyzer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (response.status === 402) {
          throw new Error("Service temporarily unavailable. Please try again later.");
        }
        throw new Error(data.error || "Analysis failed");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      
      // Show toast based on result
      if (data.classification === "SAFE") {
        toast.success("Analysis complete - Content appears safe");
      } else if (data.classification === "WARNING") {
        toast.warning("Analysis complete - Proceed with caution");
      } else {
        toast.error("Analysis complete - High risk detected!");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze message";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyzeMessage,
    isLoading,
    result,
    error,
    reset,
  };
};
