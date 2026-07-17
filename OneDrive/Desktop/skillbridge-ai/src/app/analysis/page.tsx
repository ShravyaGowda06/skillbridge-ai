"use client";

import { useState } from "react";
import { AlertCircle, BrainCircuit, Play } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { ErrorPanel, LoadingPanel } from "@/components/ui/status";
import { analysisSteps } from "@/lib/data";
import { loadStoredProfile } from "@/lib/profile-storage";
import type { SkillAnalysis } from "@/lib/types";

export default function AnalysisPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function runAnalysis() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: loadStoredProfile() })
      });
      const result = (await response.json()) as {
        analysis?: SkillAnalysis;
        fallback?: SkillAnalysis;
        error?: string;
      };

      if (!response.ok) {
        setAnalysis(result.fallback || null);
        throw new Error(result.error || "AI analysis failed.");
      }

      setAnalysis(result.analysis || null);
      setStatus("ready");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "AI analysis failed.");
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Badge>AI Analysis</Badge>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h1 className="text-4xl font-black sm:text-5xl">Analyze readiness with Gemini.</h1>
              <p className="mt-4 text-[var(--muted)]">
                SkillBridge AI uses the saved student profile to identify strengths, skill gaps, learning recommendations, and next milestones.
              </p>
              <button
                type="button"
                onClick={runAnalysis}
                className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
              >
                <Play size={18} aria-hidden="true" />
                Run AI analysis
              </button>
            </div>

            <div className="grid gap-4">
              {analysisSteps.map((step) => (
                <Panel key={step.title} className="flex gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-[rgba(93,116,214,0.12)] text-[var(--accent)]">
                    <step.icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-black">{step.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.copy}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </div>

          <div className="mt-8">
            {status === "idle" && (
              <Panel className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 shrink-0 text-[var(--secondary)]" size={20} aria-hidden="true" />
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Save a student profile, then run analysis to generate personalized skill-gap recommendations.
                </p>
              </Panel>
            )}
            {status === "loading" && <LoadingPanel label="Asking Gemini to analyze the student profile..." />}
            {status === "ready" && analysis && (
              <Panel className="border-[rgba(17,97,73,0.24)] bg-[rgba(17,97,73,0.06)]">
                <div className="flex items-center gap-3 font-black text-[var(--primary)]">
                  <BrainCircuit size={22} aria-hidden="true" />
                  Gemini skill-gap analysis
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{analysis.summary}</p>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-lg bg-white p-4">
                    <h3 className="font-black">Strengths</h3>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                      {analysis.strengths.map((strength) => (
                        <li key={strength}>- {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <h3 className="font-black">Next milestones</h3>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                      {analysis.nextMilestones.map((milestone) => (
                        <li key={milestone}>- {milestone}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white p-4">
                  <h3 className="font-black">Skill gaps</h3>
                  <div className="mt-3 grid gap-3">
                    {analysis.skillGaps.map((gap) => (
                      <div key={`${gap.skill}-${gap.targetLevel}`} className="rounded-lg border border-[var(--line)] p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold">{gap.skill}</p>
                          <span className="rounded-full bg-[var(--panel-strong)] px-3 py-1 text-xs font-bold text-[var(--primary)]">
                            {gap.currentLevel} to {gap.targetLevel}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{gap.whyItMatters}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white p-4">
                  <h3 className="font-black">Learning recommendations</h3>
                  <div className="mt-3 grid gap-3">
                    {analysis.recommendations.map((recommendation) => (
                      <div key={recommendation.title} className="rounded-lg border border-[var(--line)] p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold">{recommendation.title}</p>
                          <span className="rounded-full bg-[rgba(233,180,76,0.18)] px-3 py-1 text-xs font-bold text-[var(--foreground)]">
                            {recommendation.priority}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {recommendation.timeframe} · {recommendation.costFit}
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                          {recommendation.steps.map((step) => (
                            <li key={step}>- {step}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-white p-4">
                  <h3 className="font-black">Questions to ask your mentor</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                    {analysis.mentorQuestions.map((question) => (
                      <li key={question}>- {question}</li>
                    ))}
                  </ul>
                </div>
              </Panel>
            )}
            {status === "error" && (
              <div className="space-y-4">
                <ErrorPanel message={errorMessage || "The AI analysis route failed. Please try again."} />
                {analysis && (
                  <Panel>
                    <p className="text-sm leading-6 text-[var(--muted)]">{analysis.summary}</p>
                  </Panel>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
