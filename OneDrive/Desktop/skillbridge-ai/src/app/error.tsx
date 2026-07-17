"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorPanel } from "@/components/ui/status";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <ErrorPanel message="SkillBridge AI hit an unexpected UI error." />
        <Button type="button" variant="secondary" onClick={reset}>
          <RotateCcw size={18} aria-hidden="true" />
          Try again
        </Button>
      </div>
    </main>
  );
}
