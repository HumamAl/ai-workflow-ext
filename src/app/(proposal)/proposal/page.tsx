import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ProjectCard } from "@/components/proposal/project-card";
import { SkillsGrid } from "@/components/proposal/skills-grid";

export default function ProposalPage() {
  const projectName = APP_CONFIG.projectName;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

        {/* ── Section 1: Hero ── */}
        <section
          className="relative rounded-lg overflow-hidden"
          style={{ background: "var(--section-dark)" }}
        >
          {/* Radial teal highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, oklch(0.62 0.16 195 / 0.10) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-12 space-y-5">
            {/* Effort badge */}
            <div className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-white/60">
                Built this demo for your project
              </span>
            </div>

            {/* Role prefix */}
            <p className="font-mono text-xs tracking-widest uppercase text-white/40">
              Full-Stack Developer · Chrome Extension Specialist
            </p>

            {/* Name headline */}
            <h1 className="text-5xl md:text-6xl tracking-tight leading-none">
              <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
              <span className="font-black text-white">{profile.name}</span>
            </h1>

            {/* Tailored value prop */}
            <p className="text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed">
              {profile.tagline}
            </p>

            <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-5">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(to right, white, oklch(1 0 0 / 0.65))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  24+
                </div>
                <div className="text-xs text-white/50 mt-0.5">Projects Shipped</div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(to right, white, oklch(1 0 0 / 0.65))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  &lt; 48hr
                </div>
                <div className="text-xs text-white/50 mt-0.5">Demo Turnaround</div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(to right, white, oklch(1 0 0 / 0.65))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  15+
                </div>
                <div className="text-xs text-white/50 mt-0.5">Industries</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">Relevant Projects</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {portfolioProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                relevance={project.relevance}
                outcome={project.outcome}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Process
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">How I Work</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile.approach.map((step, i) => (
              <div
                key={step.title}
                className="aesthetic-card p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Tech Stack
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">What I Build With</h2>
          </div>

          <SkillsGrid categories={profile.skillCategories} />
        </section>

        {/* ── Section 5: CTA ── */}
        <section
          className="relative rounded-lg overflow-hidden text-center"
          style={{ background: "var(--section-dark)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at bottom, oklch(0.62 0.16 195 / 0.08) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 p-8 md:p-12 space-y-4">
            {/* Availability */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "color-mix(in oklch, var(--success) 80%, transparent)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "var(--success)" }}
                />
              </span>
              <span
                className="text-sm"
                style={{ color: "color-mix(in oklch, var(--success) 80%, white)" }}
              >
                Currently available for new projects
              </span>
            </div>

            {/* Headline — tailored to this project */}
            <h2 className="text-2xl font-bold text-white">
              Your extension is one week away from shipping.
            </h2>

            {/* Body */}
            <p className="text-white/65 max-w-lg mx-auto leading-relaxed text-sm">
              I built the {projectName} demo to show you how the DOM injection pipeline
              works end-to-end — Manifest V3 service worker, MutationObserver, retry
              logic, the whole thing. The real extension ships from this foundation,
              not a blank file.
            </p>

            {/* Primary action */}
            <p className="text-lg font-semibold text-white pt-2">
              Reply on Upwork to start
            </p>

            {/* Secondary link */}
            <a
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/45 hover:text-white/65 transition-colors duration-150"
            >
              Back to the demo
            </a>

            {/* Signature */}
            <p className="pt-4 text-sm text-white/35 border-t border-white/10 mt-4">
              -- Humam
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
