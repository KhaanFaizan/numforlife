import Link from "next/link";

const PORTFOLIO_ITEMS = [
  {
    href: "/number?view=page",
    title: "数字生命",
    img: "/images/portfolio-number.avif",
  },
  {
    href: "/name?view=page",
    title: "姓名学",
    img: "/images/portfolio-name.webp",
  },
  {
    href: "/tarot?view=page",
    title: "塔罗占卜",
    img: "/images/portfolio-tarot.webp",
  },
  {
    href: "/eastern-divination?view=page",
    title: "东方占卜术",
    img: "/images/portfolio-eastern.avif",
  },
];

export function ProductServicesSection() {
  return (
    <>
      <section className="page-hero portfolio-hero">
        <h1>产品服务</h1>
      </section>
      <section className="portfolio">
        <div className="portfolio-grid">
          {PORTFOLIO_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="portfolio-card">
              <h2>{item.title}</h2>
              <span className="portfolio-card-media">
                <img src={item.img} alt="" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
