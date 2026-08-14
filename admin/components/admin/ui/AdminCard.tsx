import { cn } from "@/lib/utils";

export function AdminCard({
  children,
  className,
  padding = "md",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}) {
  const paddingClass = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }[padding];

  return (
    <div
      className={cn(
        "rounded-[24px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.04)]",
        paddingClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminPanelHeader({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-black">
            {icon}
          </div>
        )}
        <div>
          <h2 className="font-sans text-lg font-bold tracking-tight text-black">
            {title}
          </h2>
          {description && (
            <p className="mt-1 font-mono text-xs leading-relaxed text-black/45">
              {description}
            </p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function AdminStatCard({
  label,
  value,
  icon,
  accent = "default",
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: "default" | "accent" | "emerald";
}) {
  const accentStyles = {
    default: "from-black/[0.03] to-black/[0.01]",
    accent: "from-accent/15 to-accent/5",
    emerald: "from-emerald-50 to-emerald-50/50",
  };

  return (
    <AdminCard className="group relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-100 transition-opacity group-hover:opacity-100",
          accentStyles[accent],
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-black/40">
            {label}
          </p>
          <p className="mt-2 font-sans text-4xl font-bold tracking-tight text-black">
            {value}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/[0.04]">
          {icon}
        </div>
      </div>
    </AdminCard>
  );
}
