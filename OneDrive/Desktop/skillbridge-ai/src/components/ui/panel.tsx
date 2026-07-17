import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-sm backdrop-blur", className)}>
      {children}
    </div>
  );
}
