import { cn } from "@/lib/utils";
import ShieldIcon from "./ShieldIcon";
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, Flag } from "lucide-react";

interface AnalysisResultProps {
  result: {
    classification: "SAFE" | "WARNING" | "DANGER";
    confidence: number;
    summary: string;
    explanation: string;
    redFlags: string[];
    tips: string[];
  };
}

const classificationConfig = {
  SAFE: {
    variant: "safe" as const,
    bgClass: "bg-safe-bg",
    borderClass: "border-safe/30",
    icon: CheckCircle,
    title: "Looks Safe",
    description: "No major concerns detected",
  },
  WARNING: {
    variant: "warning" as const,
    bgClass: "bg-warning-bg",
    borderClass: "border-warning/30",
    icon: AlertTriangle,
    title: "Proceed with Caution",
    description: "Some suspicious elements detected",
  },
  DANGER: {
    variant: "danger" as const,
    bgClass: "bg-danger-bg",
    borderClass: "border-danger/30",
    icon: XCircle,
    title: "High Risk Detected",
    description: "This appears to be a scam or phishing attempt",
  },
};

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const config = classificationConfig[result.classification];
  const StatusIcon = config.icon;

  return (
    <div className="animate-scale-in space-y-4">
      {/* Main Result Card */}
      <div
        className={cn(
          "rounded-2xl border-2 p-6 transition-all",
          config.bgClass,
          config.borderClass
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <ShieldIcon variant={config.variant} size={48} animate />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <StatusIcon
                className={cn(
                  "h-5 w-5",
                  result.classification === "SAFE" && "text-safe",
                  result.classification === "WARNING" && "text-warning",
                  result.classification === "DANGER" && "text-danger"
                )}
              />
              <h3 className="text-xl font-bold">{config.title}</h3>
            </div>
            <p className="text-muted-foreground">{config.description}</p>
            
            {/* Confidence Meter */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-mono font-medium">{result.confidence}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    result.classification === "SAFE" && "gradient-safe",
                    result.classification === "WARNING" && "gradient-warning",
                    result.classification === "DANGER" && "gradient-danger"
                  )}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-card p-4">
        <h4 className="font-semibold text-foreground mb-2">Summary</h4>
        <p className="text-muted-foreground">{result.summary}</p>
      </div>

      {/* Explanation */}
      <div className="rounded-xl border bg-card p-4">
        <h4 className="font-semibold text-foreground mb-2">What This Means</h4>
        <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
      </div>

      {/* Red Flags */}
      {result.redFlags && result.redFlags.length > 0 && (
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flag className="h-4 w-4 text-danger" />
            <h4 className="font-semibold text-foreground">Red Flags Detected</h4>
          </div>
          <ul className="space-y-2">
            {result.redFlags.map((flag, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-danger" />
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety Tips */}
      {result.tips && result.tips.length > 0 && (
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-warning" />
            <h4 className="font-semibold text-foreground">Safety Tips</h4>
          </div>
          <ul className="space-y-2">
            {result.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-safe" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-center text-xs text-muted-foreground/70 italic">
        ⚠️ This is a student prototype. Always verify suspicious content with a trusted adult.
      </p>
    </div>
  );
};

export default AnalysisResult;
