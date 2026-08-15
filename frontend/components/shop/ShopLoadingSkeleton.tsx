export function ShopLoadingSkeleton() {
  return (
    <div className="section-container pb-14 md:pb-20">
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 animate-pulse rounded-full bg-bg-subtle"
          />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[28px] border border-border bg-surface"
          >
            <div className="aspect-[4/3] animate-pulse bg-bg-subtle" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-1/3 animate-pulse rounded bg-bg-subtle" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-bg-subtle" />
              <div className="h-8 w-1/2 animate-pulse rounded bg-bg-subtle" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
