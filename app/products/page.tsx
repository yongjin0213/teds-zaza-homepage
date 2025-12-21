import Image from "next/image";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="grid gap-12">
      <section className="grid gap-4 reveal">
        <div className="checker-band w-32" />
        <h1 className="section-title">Products</h1>
        <p className="text-lg leading-8">
          Kitchen gear Ted actually uses. These links are affiliate-ready, so the
          crust fund stays healthy.
        </p>
        <div className="flex flex-wrap gap-3">
          <input
            className="w-full max-w-md rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-sm focus:outline-none"
            placeholder="Search gear"
          />
          <button className="rounded-full bg-[color:var(--tomato)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">
            Filters
          </button>
          <button className="rounded-full border-2 border-[color:var(--tomato)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]">
            Prime-ish Picks
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <article
            key={product.id}
            className={`card overflow-hidden reveal reveal-delay-${Math.min(
              index + 1,
              6
            )}`}
          >
            <div className="relative">
              <span className="absolute left-4 top-4 rounded-full bg-[color:var(--tomato)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                {product.badge}
              </span>
              <Image
                src={product.image}
                alt={product.name}
                width={420}
                height={300}
                className="h-52 w-full object-cover"
              />
            </div>
            <div className="p-5 grid gap-3">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]">
                <span>{product.price}</span>
              </div>
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--tomato-dark)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:-translate-y-0.5"
              >
                Shop on Amazon
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
