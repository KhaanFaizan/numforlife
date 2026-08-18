import Link from "next/link";

import { formatProductPrice } from "@/lib/shop/pricing";
import type { PricedProduct } from "@/lib/shop/types";

export function ProductCard({
  product,
  bestSeller = false,
}: {
  product: PricedProduct;
  bestSeller?: boolean;
}) {
  const href = `/shop/${product.id}`;

  return (
    <article className="product-card">
      <Link href={href}>
        <span className="product-card-media">
          {bestSeller ? <span className="product-badge">Best Seller</span> : null}
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="product-card-placeholder" aria-hidden>
              No image
            </div>
          )}
        </span>
        <h2>{product.name}</h2>
      </Link>
      <div className="price">{formatProductPrice(product)}</div>
    </article>
  );
}
