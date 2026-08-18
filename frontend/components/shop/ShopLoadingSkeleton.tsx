export function ShopLoadingSkeleton() {
  return (
    <div className="shop-page" aria-hidden>
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="shop-skeleton-line" />
          <div className="shop-skeleton-line shop-skeleton-line--short" />
        </aside>
        <div className="shop-main">
          <div className="shop-banner shop-banner--skeleton" />
          <div className="shop-skeleton-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="shop-skeleton-card" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
