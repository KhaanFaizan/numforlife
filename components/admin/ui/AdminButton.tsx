import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

type AdminButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  size?: "sm" | "md";
  loading?: boolean;
};

export function AdminButton({
  className,
  variant = "secondary",
  size = "md",
  loading = false,
  children,
  disabled,
  ...props
}: AdminButtonProps) {
  const variants = {
    primary:
      "bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-black/90 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]",
    secondary:
      "border border-black/[0.08] bg-white text-black shadow-sm hover:border-black/15 hover:bg-[#fafafa]",
    ghost: "text-black/60 hover:bg-black/[0.04] hover:text-black",
    danger:
      "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
    accent:
      "bg-accent text-black shadow-[0_4px_14px_rgba(255,193,7,0.35)] hover:bg-accent-hover",
  };

  const sizes = {
    sm: "rounded-lg px-3 py-2 text-xs",
    md: "rounded-xl px-4 py-2.5 text-sm",
  };

  return (
    <button
      className={cn(
        "focus-accent-light inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
}

export function AdminLinkButton({
  className,
  variant = "secondary",
  size = "md",
  children,
  ...props
}: React.ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md";
}) {
  const variants = {
    primary:
      "bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-black/90",
    secondary:
      "border border-black/[0.08] bg-white text-black shadow-sm hover:border-black/15 hover:bg-[#fafafa]",
    ghost: "text-black/60 hover:bg-black/[0.04] hover:text-black",
    accent: "bg-accent text-black hover:bg-accent-hover",
  };

  const sizes = {
    sm: "rounded-lg px-3 py-2 text-xs",
    md: "rounded-xl px-4 py-2.5 text-sm",
  };

  return (
    <a
      className={cn(
        "focus-accent-light inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export const adminInputClass =
  "w-full rounded-xl border border-black/[0.08] bg-[#f8f8f8] px-4 py-3 font-sans text-sm text-black shadow-inner shadow-black/[0.02] outline-none transition-all placeholder:text-black/30 focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,193,7,0.15)]";

export const adminTextareaClass =
  "w-full rounded-xl border border-black/[0.08] bg-[#f8f8f8] px-4 py-3 font-mono text-sm leading-relaxed text-black shadow-inner shadow-black/[0.02] outline-none transition-all placeholder:text-black/30 focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,193,7,0.15)]";

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-sm font-semibold text-black/80">
        {label}
      </span>
      {hint && (
        <span className="mb-2 block font-mono text-[11px] text-black/40">
          {hint}
        </span>
      )}
      {children}
    </label>
  );
}

export function AdminFormCard({
  title,
  index,
  onRemove,
  children,
}: {
  title: string;
  index?: number;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-white">
      <div className="flex items-center justify-between border-b border-black/[0.05] bg-white/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          {typeof index === "number" && (
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-black text-[10px] font-bold text-white">
              {index + 1}
            </span>
          )}
          <p className="font-sans text-sm font-semibold text-black">{title}</p>
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg p-2 text-black/30 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </div>
  );
}
