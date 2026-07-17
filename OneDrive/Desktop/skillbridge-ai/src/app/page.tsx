import { ArrowRight, CheckCircle2, Compass, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { aiBoundaries, heroSignals, impactPillars } from "@/lib/data";

export default function LandingPage() {
  return (
    <PageShell>
      <section className="surface-grid min-h-[calc(100vh-65px)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="animate-rise max-w-3xl">
            <Badge>Hackathon project - Sustainability & Social Impact</Badge>
            <h1 className="mt-6 text-5xl font-black tracking-normal text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              SkillBridge AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              A student-first platform that uses Gemini to help underserved learners build practical, sustainable career pathways.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/profile">
                Build profile <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href="/analysis" variant="secondary">
                Run AI analysis
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroSignals.map((signal) => (
                <span key={signal} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--muted)] shadow-sm">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <Panel className="animate-rise relative overflow-hidden p-0">
            <div className="border-b border-[var(--line)] bg-[var(--panel-strong)] p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
                <Compass size={18} aria-hidden="true" />
                Student pathway preview
              </div>
            </div>
            <div className="space-y-4 p-5">
              {["Profile context", "Skill gap map", "Learning plan", "Mentor support"].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-lg border border-[var(--line)] bg-white p-4">
                  <span className="animate-soft-pulse grid size-10 shrink-0 place-items-center rounded-lg bg-[rgba(17,97,73,0.1)] text-sm font-black text-[var(--primary)]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-bold">{step}</p>
                <p className="text-sm text-[var(--muted)]">Powered by saved student context and Gemini guidance.</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Impact model"
          title="Built for access, agency, and honest AI"
          copy="SkillBridge AI focuses on practical support for students whose career decisions are shaped by time, money, location, language, and opportunity access."
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-3">
          {impactPillars.map((pillar) => (
            <Panel key={pillar.title}>
              <pillar.icon className="text-[var(--primary)]" size={28} aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{pillar.copy}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section className="bg-[var(--primary-strong)] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--secondary)]">
              <ShieldCheck size={18} aria-hidden="true" />
              AI integrity
            </div>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">Real AI guidance with clear fallbacks.</h2>
          </div>
          <div className="grid gap-3">
            {aiBoundaries.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg bg-white/10 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--secondary)]" size={18} aria-hidden="true" />
                <p className="text-sm leading-6 text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
