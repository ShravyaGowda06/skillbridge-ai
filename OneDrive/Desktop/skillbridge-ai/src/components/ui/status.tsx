export function LoadingPanel({ label = "Preparing..." }: { label?: string }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5" role="status" aria-live="polite">
      <div className="mb-4 h-2 w-24 animate-pulse rounded-full bg-[rgba(17,97,73,0.2)]" />
      <div className="space-y-3">
        <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-200" />
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}

export function ErrorPanel({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
      {message}
    </div>
  );
}
