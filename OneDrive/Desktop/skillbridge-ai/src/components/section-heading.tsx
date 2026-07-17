import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-black tracking-normal text-[var(--foreground)] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">{copy}</p>
    </div>
  );
}
