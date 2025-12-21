import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById, getRecipeIds } from "@/lib/recipes";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getRecipeIds();
  return ids.map((id) => ({ slug: id }));
}

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeById(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="grid gap-12">
      <section className="grid gap-4 reveal">
        <div className="checker-band w-32" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
          {recipe.tag}
        </p>
        <h1 className="section-title">{recipe.title}</h1>
        <p className="text-lg leading-8">{recipe.summary}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6 reveal reveal-delay-1">
          <Image
            src={recipe.videoImage}
            alt={`TikTok embed for ${recipe.title}`}
            width={640}
            height={360}
            className="h-auto w-full"
          />
        </div>
        <div className="grid gap-6 reveal reveal-delay-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]">
              Inspiration
            </h2>
            <div className="mt-4 grid gap-4 text-base leading-7">
              {recipe.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]">
              Ingredients
            </h2>
            <ul className="mt-4 list-disc pl-6 text-base leading-7">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="card p-6 reveal reveal-delay-3">
        <h2 className="text-xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]">
          Steps
        </h2>
        <ol className="mt-4 list-decimal pl-6 text-base leading-7">
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <Link className="nav-link w-fit" href="/recipes">
        Back to recipes
      </Link>
    </div>
  );
}
