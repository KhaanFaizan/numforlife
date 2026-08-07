import { cn } from "@/lib/utils";

export function Spinner({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5 border-[1.5px]" : "h-4 w-4 border-2";

  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        sizeClass,
        className,
      )}
      aria-hidden
    />
  );
}
