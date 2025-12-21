"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Recipe } from "@/lib/recipes";

type RecipesClientProps = {
  recipes: Recipe[];
};

export default function RecipesClient({ recipes }: RecipesClientProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return recipes;
    return recipes.filter((recipe) => {
      const haystack = `${recipe.title} ${recipe.summary} ${recipe.story.join(" ")}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, recipes]);

  return (
    <div className="grid gap-12">
      <section className="grid gap-4 reveal">
        <div className="checker-band w-32" />
        <h1 className="section-title">Recipes</h1>
        <p className="text-lg leading-8 text-[color:var(--ink)]">
          Every pizza in Ted&rsquo;s vault is built to be loud, crispy, and shareable.
          Pick a slice and start cooking.
        </p>
        <div className="flex flex-wrap gap-3">
          <input
            className="w-full max-w-md rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-sm focus:outline-none"
            placeholder="Search recipes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
            {filtered.length} results
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((recipe, index) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className={`card overflow-hidden reveal reveal-delay-${Math.min(
              index + 1,
              6
            )}`}
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={420}
              height={300}
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
                {recipe.tag}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{recipe.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--ink)]">
                {recipe.summary}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
