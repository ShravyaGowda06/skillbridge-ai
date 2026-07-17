import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(17,97,73,0.16)] bg-[rgba(17,97,73,0.08)] px-3 py-1 text-xs font-semibold text-[var(--primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
