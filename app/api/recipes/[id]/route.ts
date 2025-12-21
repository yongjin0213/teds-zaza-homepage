import { NextResponse } from "next/server";
import { getRecipeById } from "@/lib/recipes";
import { sql } from "@/lib/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}

export async function DELETE(_: Request, { params }: RouteParams) {
  const { id } = await params;
  await sql`delete from recipes where id = ${id}`;
  return NextResponse.json({ ok: true });
}

type RecipeUpdatePayload = {
  title?: string;
  summary?: string;
  image?: string;
  tag?: string;
  videoImage?: string;
  story?: string[];
  ingredients?: string[];
  steps?: string[];
};

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const payload = (await request.json()) as RecipeUpdatePayload;

  const rows = await sql<{ id: string }[]>`
    update recipes
    set
      title = coalesce(${payload.title}, title),
      summary = coalesce(${payload.summary}, summary),
      image = coalesce(${payload.image}, image),
      tag = coalesce(${payload.tag}, tag),
      video_image = coalesce(${payload.videoImage}, video_image),
      story = coalesce(${payload.story ? JSON.stringify(payload.story) : null}::jsonb, story),
      ingredients = coalesce(${payload.ingredients ? JSON.stringify(payload.ingredients) : null}::jsonb, ingredients),
      steps = coalesce(${payload.steps ? JSON.stringify(payload.steps) : null}::jsonb, steps)
    where id = ${id}
    returning id
  `;

  if (!rows.length) {
    if (!payload.title || !payload.summary || !payload.image || !payload.tag) {
      return NextResponse.json(
        { error: "Missing fields for insert" },
        { status: 400 }
      );
    }

    await sql`
      insert into recipes (id, title, image, tag, summary, video_image, story, ingredients, steps)
      values (
        ${id},
        ${payload.title},
        ${payload.image},
        ${payload.tag},
        ${payload.summary},
        ${payload.videoImage ?? "/images/recipes/tiktok-placeholder.svg"},
        ${JSON.stringify(payload.story ?? [])}::jsonb,
        ${JSON.stringify(payload.ingredients ?? [])}::jsonb,
        ${JSON.stringify(payload.steps ?? [])}::jsonb
      )
    `;
  }

  return NextResponse.json({ ok: true });
}
