"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaCloser() {
  return (
    <section
      className="p-6 rounded-xl"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">Ready to discuss the approach?</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve worked through the hard parts of MV3 compliance and DOM injection.
            Happy to walk through any of this on a call.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            style={{ transitionDuration: "120ms" }}
          >
            See the proposal
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--primary) 12%, transparent), color-mix(in oklch, var(--primary) 6%, transparent))",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
