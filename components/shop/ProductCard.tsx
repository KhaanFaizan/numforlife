import Image from "next/image";
import Link from "next/link";

import { formatCoinAmount } from "@/lib/shop/pricing";
import type { PricedProduct } from "@/lib/shop/types";

export function ProductCard({ product }: { product: PricedProduct }) {
  const hasDiscount = product.discountPercent > 0 && product.savings > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-surface transition-shadow hover:shadow-md">
      <Link href={`/shop/${product.id}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-fg-subtle">
              No image
            </div>
          )}
          {hasDiscount ? (
            <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold tracking-wide text-accent-fg uppercase">
              -{product.discountPercent}%
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        {product.merchantName ? (
          <p className="font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase">
            {product.merchantName}
          </p>
        ) : null}

        <Link href={`/shop/${product.id}`}>
          <h2 className="cjk mt-2 font-sans text-lg font-semibold text-fg transition-opacity hover:opacity-80 md:text-xl">
            {product.name}
          </h2>
        </Link>

        <div className="mt-4">
          {hasDiscount ? (
            <>
              <p className="font-sans text-2xl font-bold text-fg">
                {formatCoinAmount(product.memberPrice, product.currency)}
              </p>
              <p className="mt-1 font-sans text-sm text-fg-muted line-through">
                {formatCoinAmount(product.listPrice, product.currency)}
              </p>
            </>
          ) : (
            <p className="font-sans text-2xl font-bold text-fg">
              {formatCoinAmount(product.listPrice, product.currency)}
            </p>
          )}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={`/shop/${product.id}`}
            className="focus-accent inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-border px-5 py-2.5 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
          >
            查看详情
          </Link>
        </div>
      </div>
    </article>
  );
}
