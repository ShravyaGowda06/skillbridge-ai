import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
};

export function Field({
  label,
  name,
  placeholder,
  type = "text",
  multiline,
  className
}: FieldProps) {
  const shared =
    "focus-ring mt-2 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--foreground)] shadow-sm transition placeholder:text-slate-400 focus:border-[var(--accent)]";

  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-semibold text-[var(--foreground)]">{label}</span>
      {multiline ? (
        <textarea name={name} rows={5} placeholder={placeholder} className={shared} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={shared} />
      )}
    </label>
  );
}
