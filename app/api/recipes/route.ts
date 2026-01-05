import { NextResponse } from "next/server";
import { getRecipes } from "@/lib/recipes";
import { sql } from "@/lib/db";

type RecipePayload = {
  id: string;
  title: string;
  summary: string;
  image: string;
  tag?: string;
  vidid?: string;
  story?: string[];
  ingredients?: string[];
  steps?: string[];
};

export async function GET() {
  const recipes = await getRecipes();
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as RecipePayload;

  if (!payload?.id || !payload?.title || !payload?.summary || !payload?.image) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const tag = payload.tag ?? "Admin";
  const videoImage = payload.vidid ?? "/images/recipes/tiktok-placeholder.svg";
  const story = payload.story ?? [];
  const ingredients = payload.ingredients ?? [];
  const steps = payload.steps ?? [];

  await sql`\n    insert into recipes (id, title, image, tag, summary, vidid, story, ingredients, steps)\n    values (\n      ${payload.id},\n      ${payload.title},\n      ${payload.image},\n      ${tag},\n      ${payload.summary},\n      ${videoImage},\n      ${JSON.stringify(story)}::jsonb,\n      ${JSON.stringify(ingredients)}::jsonb,\n      ${JSON.stringify(steps)}::jsonb\n    )\n    on conflict (id) do update set\n      title = excluded.title,\n      image = excluded.image,\n      tag = excluded.tag,\n      summary = excluded.summary,\n      vidid = excluded.vidid,\n      story = excluded.story,\n      ingredients = excluded.ingredients,\n      steps = excluded.steps\n  `;

  return NextResponse.json({ ok: true });
}
