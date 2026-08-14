import Image from "next/image";
import Link from "next/link";

import { formatCoinAmount } from "@/lib/shop/pricing";
import type { PricedProduct } from "@/lib/shop/types";

export function ProductDetailView({
  product,
  tierLabel,
  isLoggedIn = false,
}: {
  product: PricedProduct;
  tierLabel: string;
  isLoggedIn?: boolean;
}) {
  const hasDiscount = product.discountPercent > 0 && product.savings > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-[28px] border border-border bg-bg-subtle">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-sm text-fg-subtle">
            暂无商品图片
          </div>
        )}
      </div>

      <div>
        {product.merchantName ? (
          <div className="flex items-center gap-3">
            {product.merchantLogo ? (
              <Image
                src={product.merchantLogo}
                alt=""
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : null}
            <p className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
              {product.merchantName}
            </p>
          </div>
        ) : null}

        <h1 className="cjk section-heading mt-3">{product.name}</h1>

        {product.category ? (
          <p className="mt-3 font-sans text-sm text-fg-muted">分类：{product.category}</p>
        ) : null}

        <div className="mt-6 rounded-[24px] border border-border bg-surface p-5">
          {hasDiscount ? (
            <>
              <p className="font-sans text-3xl font-bold text-fg">
                {formatCoinAmount(product.memberPrice, product.currency)}
              </p>
              <p className="mt-1 font-sans text-sm text-fg-muted line-through">
                原价 {formatCoinAmount(product.listPrice, product.currency)}
              </p>
              <p className="mt-2 font-sans text-sm text-accent-ink">
                {tierLabel} 享 {product.discountPercent}% 商城优惠，节省{" "}
                {formatCoinAmount(product.savings, product.currency)}
              </p>
            </>
          ) : (
            <>
              <p className="font-sans text-3xl font-bold text-fg">
                {formatCoinAmount(product.listPrice, product.currency)}
              </p>
              <p className="mt-2 font-sans text-sm text-fg-muted">
                当前 {tierLabel} 暂无额外商城折扣。
              </p>
            </>
          )}

          {product.stock !== null ? (
            <p className="mt-3 font-mono text-xs text-fg-subtle">库存 {product.stock}</p>
          ) : null}
        </div>

        {product.description ? (
          <div className="mt-6 rounded-[24px] border border-border bg-surface p-5">
            <h2 className="font-sans text-sm font-semibold text-fg">商品说明</h2>
            <p className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed text-fg-muted">
              {product.description}
            </p>
          </div>
        ) : null}

        <div className="mt-8 space-y-3">
          <Link
            href="https://app.numforlife.com/h5/"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-accent inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            在 App 购买
          </Link>
          {!isLoggedIn ? (
            <Link
              href="/login?next=/shop"
              className="focus-accent inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
            >
              登录查看会员价
            </Link>
          ) : null}
          <Link
            href="/membership"
            className="focus-accent inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-border px-6 py-3 font-sans text-sm font-semibold text-fg transition-colors hover:border-accent"
          >
            了解会员方案
          </Link>
        </div>

        <p className="mt-5 font-sans text-xs leading-relaxed text-fg-subtle">
          网站展示 PlenorHub 目录价与会员折扣预览。结账流程与 KCC Coin 扣款请在 App 内完成；会员
          5%/10% 折扣在支付环节的落地方式仍待客户确认。
        </p>
      </div>
    </div>
  );
}
