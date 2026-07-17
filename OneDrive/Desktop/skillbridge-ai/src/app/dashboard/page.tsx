import { ArrowUpRight, Clock3 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { dashboardStats, opportunityCards, roadmapItems } from "@/lib/data";

export default function DashboardPage() {
  return (
    <PageShell>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Badge>Dashboard</Badge>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black sm:text-5xl">Student progress workspace.</h1>
              <p className="mt-4 max-w-2xl text-[var(--muted)]">
                A clear view of readiness, next actions, and AI-assisted opportunity preparation.
              </p>
            </div>
            <p className="rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--muted)]">
              Gemini AI connected through server routes
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat) => (
              <Panel key={stat.label}>
                <p className="text-sm font-semibold text-[var(--muted)]">{stat.label}</p>
                <p className="mt-3 text-3xl font-black">{stat.value}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Panel>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black">Roadmap</h2>
                <Clock3 className="text-[var(--muted)]" size={22} aria-hidden="true" />
              </div>
              <div className="mt-6 space-y-4">
                {roadmapItems.map((item) => (
                  <div key={item.title} className="rounded-lg border border-[var(--line)] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-black">{item.title}</h3>
                      <span className="rounded-full bg-[var(--panel-strong)] px-3 py-1 text-xs font-bold text-[var(--primary)]">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <h2 className="text-2xl font-black">Impact snapshot</h2>
              <div className="mt-6 space-y-4">
                {["Lower cost learning paths", "Local opportunity discovery", "Mentor-informed decisions"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-lg bg-[var(--panel-strong)] p-4">
                    <span className="text-sm font-bold">{item}</span>
                    <ArrowUpRight size={18} aria-hidden="true" className="text-[var(--primary)]" />
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {opportunityCards.map((card) => (
              <Panel key={card.title}>
                <card.icon size={26} className="text-[var(--primary)]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{card.copy}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
