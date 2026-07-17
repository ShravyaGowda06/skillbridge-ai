import Link from "next/link";
import { Menu, Sprout } from "lucide-react";
import { navItems } from "@/lib/data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(223,231,221,0.8)] bg-[rgba(247,248,244,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg">
          <span className="grid size-10 place-items-center rounded-lg bg-[var(--primary)] text-white">
            <Sprout size={21} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-black tracking-wide">SkillBridge AI</span>
            <span className="block text-xs text-[var(--muted)]">Social impact skilling</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-white hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="group relative lg:hidden">
          <summary className="focus-ring grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-[var(--line)] bg-white text-[var(--foreground)] [&::-webkit-details-marker]:hidden">
            <Menu size={20} aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <nav className="absolute right-0 mt-3 grid w-64 gap-1 rounded-lg border border-[var(--line)] bg-white p-2 shadow-xl" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-lg px-3 py-3 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--panel-strong)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
