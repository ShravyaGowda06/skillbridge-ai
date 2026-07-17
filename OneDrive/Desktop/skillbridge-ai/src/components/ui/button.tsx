import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-[var(--primary)] text-white shadow-sm hover:bg-[var(--primary-strong)]",
  secondary: "border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[var(--panel-strong)]",
  ghost: "text-[var(--primary)] hover:bg-[rgba(17,97,73,0.08)]"
};

export function Button({
  children,
  className,
  href,
  onClick,
  type = "button",
  variant = "primary"
}: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
