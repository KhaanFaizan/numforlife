/** Human-readable labels for PlenorHub category slugs. */
const CATEGORY_LABELS: Record<string, string> = {
  "personal-services": "个人服务",
  services: "服务",
  books: "书籍",
  courses: "课程",
  digital: "数字商品",
  merchandise: "周边商品",
};

export function shopCategoryLabel(slug: string | null | undefined): string | null {
  if (!slug?.trim()) return null;
  const key = slug.trim().toLowerCase();
  return CATEGORY_LABELS[key] ?? slug.replace(/-/g, " ");
}

export function collectShopCategories(products: Array<{ category: string | null }>): string[] {
  const categories = new Set<string>();

  for (const product of products) {
    if (product.category?.trim()) {
      categories.add(product.category.trim());
    }
  }

  return [...categories].sort((a, b) =>
    (shopCategoryLabel(a) ?? a).localeCompare(shopCategoryLabel(b) ?? a, "zh-CN"),
  );
}
