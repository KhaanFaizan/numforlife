import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variant === "dark" ? "skeleton-shimmer" : "skeleton-shimmer-light",
        className,
      )}
      aria-hidden
    />
  );
}

export function PageLoadingSkeleton({ variant = "dark" }: { variant?: "dark" | "light" }) {
  if (variant === "light") {
    return (
      <div className="flex min-h-[50vh] flex-col gap-6 p-8" aria-label="Loading">
        <LoadingSkeleton variant="light" className="h-8 w-48" />
        <LoadingSkeleton variant="light" className="h-4 w-72" />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <LoadingSkeleton variant="light" className="h-32" />
          <LoadingSkeleton variant="light" className="h-32" />
          <LoadingSkeleton variant="light" className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 pt-24"
      aria-label="Loading"
    >
      <LoadingSkeleton className="h-4 w-32" />
      <LoadingSkeleton className="h-12 w-full max-w-lg" />
      <LoadingSkeleton className="h-12 w-full max-w-md" />
      <LoadingSkeleton className="mt-4 h-11 w-40 rounded-full" />
    </div>
  );
}
