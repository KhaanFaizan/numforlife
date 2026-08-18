"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { DEFAULT_APP_EXPERIENCE_URL } from "@/lib/calculators/constants";
import { formatProductPrice, formatUsdAmount } from "@/lib/shop/pricing";
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
  const images =
    product.gallery?.length ? product.gallery : product.imageUrl ? [product.imageUrl] : [];

  return (
    <div className="product-detail">
      <ProductGallery images={images} name={product.name} />
      <div className="product-buy">
        <nav className="product-crumbs" aria-label="Breadcrumb">
          <Link href="/">首页</Link>
          <span> / </span>
          <Link href="/shopping">商店</Link>
          <span> / </span>
          <span>{product.name}</span>
        </nav>
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">
          {hasDiscount ? (
            <>
              <s>{product.priceLabel ?? formatUsdAmount(product.listPrice)}</s>
              {formatProductPrice(product)}
            </>
          ) : (
            formatProductPrice(product)
          )}
        </p>
        <p className="product-price-note">
          {hasDiscount
            ? `${tierLabel} 享 ${product.discountPercent}% 商城优惠，节省 ${formatUsdAmount(product.savings)}。结账请在 App 完成。`
            : `结账请在 App 完成。`}
        </p>
        <div className="product-buy-btns">
          <a
            href={DEFAULT_APP_EXPERIENCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-product"
          >
            在 App 购买
          </a>
          {!isLoggedIn ? (
            <Link href={`/login?next=/shop/${product.id}`} className="btn-product">
              登录查看会员价
            </Link>
          ) : (
            <Link href="/membership" className="btn-product">
              了解会员方案
            </Link>
          )}
        </div>
        <PaymentMarks />
        <ProductAccordions product={product} />
      </div>
    </div>
  );
}

function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const main = images[active] ?? images[0];
  const showThumbs = images.length > 1;

  if (!main) {
    return (
      <div className="product-gallery is-single">
        <div className="product-main">
          <div className="product-card-placeholder">暂无商品图片</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-gallery${showThumbs ? "" : " is-single"}`}>
      {showThumbs ? (
        <div className="product-thumbs" role="list">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="listitem"
              className={i === active ? "is-active" : undefined}
              aria-label={`查看图片 ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      ) : null}
      <div className="product-main">
        <img src={main} alt={name} />
        <button
          type="button"
          className="product-zoom"
          aria-label="放大图片"
          onClick={() => setZoom(true)}
        >
          <ZoomIcon />
        </button>
      </div>
      {zoom ? (
        <button
          type="button"
          className="product-zoom-overlay"
          aria-label="关闭放大"
          onClick={() => setZoom(false)}
        >
          <img src={main} alt={name} />
        </button>
      ) : null}
    </div>
  );
}

function ProductAccordions({ product }: { product: PricedProduct }) {
  const sections = useMemo(
    () => [
      {
        id: "description",
        title: "商品说明",
        defaultOpen: true,
      },
      { id: "refund", title: "退款政策" },
      { id: "shipping", title: "配送政策" },
    ],
    [],
  );
  const initiallyOpen = useMemo(
    () => new Set(sections.filter((section) => section.defaultOpen).map((section) => section.id)),
    [sections],
  );
  const [open, setOpen] = useState<Set<string>>(initiallyOpen);

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="product-acc">
      {sections.map((section) => {
        const isOpen = open.has(section.id);
        return (
          <div className="product-acc-item" key={section.id}>
            <button
              type="button"
              className="product-acc-btn"
              aria-expanded={isOpen}
              onClick={() => toggle(section.id)}
            >
              <span>{section.title}</span>
              <span className="product-acc-icon" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div className="product-acc-body">
                {section.id === "description" ? (
                  <div className="product-rich">
                    <p>{product.description?.trim() || "暂无商品说明。"}</p>
                  </div>
                ) : null}
                {section.id === "refund" ? (
                  <p>
                    任何产品与订阅的退款政策，详情请查阅
                    <Link href="/refund-policy">退款政策</Link>。
                  </p>
                ) : null}
                {section.id === "shipping" ? (
                  <p>
                    订阅类产品将马上生效。服装与其他实体的运送，详情请查阅
                    <Link href="/shipping-policy">配送政策</Link>。
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PaymentMarks() {
  return (
    <div className="product-pay" aria-label="Payment methods">
      <span className="product-pay-mark">
        <AppleLogo />
        <span>Pay</span>
      </span>
      <span className="product-pay-mark product-pay-gpay">
        <span>G</span>
        <span>Pay</span>
      </span>
      <span className="product-pay-cards">
        <VisaMark />
        <MastercardMark />
        <AmexMark />
      </span>
    </div>
  );
}

function ZoomIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg width="12" height="14" viewBox="0 0 14 17" aria-hidden>
      <path
        fill="currentColor"
        d="M11.3 9.1c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8C2.1 4.1.4 5.2 0 7.1c-1.2 3.6.9 8.4 2.1 11.1.7 1.3 1.4 2.8 2.4 2.7 1 .1 1.3-.6 2.5-.6s1.5.6 2.5.6c1.1 0 1.7-1.3 2.4-2.6.8-1.5 1.1-2.9 1.1-3 .1 0-2.1-.8-2.1-3.2zM9.4 2.7C10 2 10.4 1 10.3 0 9.4.1 8.3.7 7.6 1.4c-.6.6-1.2 1.7-1 2.6 1.1.1 2.2-.5 2.8-1.3z"
      />
    </svg>
  );
}

function VisaMark() {
  return (
    <svg width="36" height="22" viewBox="0 0 36 22" aria-hidden>
      <rect width="36" height="22" rx="3" fill="#1a1f71" />
      <text x="6" y="15" fill="#fff" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="700">
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg width="36" height="22" viewBox="0 0 36 22" aria-hidden>
      <rect width="36" height="22" rx="3" fill="#fff" />
      <circle cx="14" cy="11" r="6" fill="#eb001b" />
      <circle cx="22" cy="11" r="6" fill="#f79e1b" />
    </svg>
  );
}

function AmexMark() {
  return (
    <svg width="36" height="22" viewBox="0 0 36 22" aria-hidden>
      <rect width="36" height="22" rx="3" fill="#2e77bc" />
      <text x="4" y="15" fill="#fff" fontSize="7" fontFamily="Arial, sans-serif" fontWeight="700">
        AMEX
      </text>
    </svg>
  );
}
