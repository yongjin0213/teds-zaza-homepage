import Image from "next/image";
import Link from "next/link";
import { getRecipes } from "@/lib/recipes";

export default async function Home() {
  const recipes = await getRecipes();
  const featured = recipes.slice(0, 3);

  return (
    <div className="flex flex-col gap-16">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="flex flex-col gap-6 reveal">
          <div className="checker-band w-40" />
          <h1 className="section-title">Ted's Zaza</h1>
          <p className="text-lg leading-8 text-[color:var(--ink)]">
            Making the trendiest and most delicious pizzas on TikTok
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/recipes"
              className="rounded-full bg-[color:var(--tomato)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[color:var(--tomato-dark)]"
            >
              Browse Recipes
            </Link>
            <Link
              href="/products"
              className="rounded-full border-2 border-[color:var(--tomato)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] transition hover:bg-[color:var(--paper)]"
            >
              Shop Favorites
            </Link>
          </div>
        </div>
        <div className="card p-6 relative overflow-hidden reveal reveal-delay-1">
          <div className="absolute right-6 top-6 rounded-full bg-[color:var(--tomato)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
            New Drop
          </div>
          <Image
            src="/images/hero-pizza.svg"
            alt="Illustration of a puff pizza slice"
            width={520}
            height={420}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="grid gap-8">
        <div className="flex items-center justify-between reveal">
          <h2 className="section-title text-2xl">Latest Recipes</h2>
          <Link className="nav-link" href="/recipes">
            View All
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className={`card overflow-hidden reveal reveal-delay-${index + 1}`}
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={420}
                height={300}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
                  {recipe.tag}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{recipe.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
