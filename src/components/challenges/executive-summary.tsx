interface ExecutiveSummaryProps {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export function ExecutiveSummary({
  commonApproach,
  differentApproach,
  accentWord,
}: ExecutiveSummaryProps) {
  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg p-6 md:p-8"
      style={{
        background: "oklch(0.06 0.02 var(--primary-h, 195))",
        backgroundImage:
          "radial-gradient(ellipse at 25% 50%, oklch(0.62 0.16 195 / 0.06), transparent 65%)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "oklch(1 0 0 / 0.06)",
      }}
    >
      <p className="text-sm md:text-base leading-relaxed text-white/45 font-mono">
        {commonApproach}
      </p>
      <hr
        className="my-4"
        style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
      />
      <p className="text-base md:text-lg leading-relaxed font-medium text-white/90">
        {renderDifferentApproach()}
      </p>
      <p className="text-xs mt-4">
        <a
          href="/"
          className="underline underline-offset-2 transition-colors duration-150 text-white/35 hover:text-white/65"
        >
          Back to the live demo
        </a>
      </p>
    </div>
  );
}
