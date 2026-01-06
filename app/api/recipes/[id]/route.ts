import { NextResponse } from "next/server";
import { getRecipeById } from "@/lib/recipes";
import { revalidatePath } from 'next/cache';
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
  vidid?: string;
  story?: string[];
  ingredients?: string[];
  steps?: string[];
};

export async function PUT(request: Request, { params }: RouteParams) {
  const { id: oldId } = await params;
  const payload = (await request.json()) as RecipeUpdatePayload;

  // Generate new slug from title if title is being updated
  const newId = payload.title
    ? payload.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : oldId;

  const slugChanged = oldId !== newId;

  try {
    if (slugChanged) {
      // If slug changed, we need to insert new and delete old
      
      // First, get the existing recipe to fill in any missing fields
      const existingRecipe = (await sql`
        select * from recipes where id = ${oldId}
      `)[0];

      if (!existingRecipe) {
        return NextResponse.json(
          { error: "Recipe not found" },
          { status: 404 }
        );
      }

      // Insert new record with new ID
      await sql`
        insert into recipes (id, title, image, tag, summary, vidid, story, ingredients, steps)
        values (
          ${newId},
          ${payload.title ?? existingRecipe.title},
          ${payload.image ?? existingRecipe.image},
          ${payload.tag ?? existingRecipe.tag},
          ${payload.summary ?? existingRecipe.summary},
          ${payload.vidid ?? existingRecipe.vidid},
          ${payload.story ? JSON.stringify(payload.story) : existingRecipe.story}::jsonb,
          ${payload.ingredients ? JSON.stringify(payload.ingredients) : existingRecipe.ingredients}::jsonb,
          ${payload.steps ? JSON.stringify(payload.steps) : existingRecipe.steps}::jsonb
        )
      `;

      // Delete old record
      await sql`delete from recipes where id = ${oldId}`;

      // Revalidate both old and new paths
      revalidatePath('/recipes');
      revalidatePath(`/recipes/${oldId}`);
      revalidatePath(`/recipes/${newId}`);

      return NextResponse.json({ ok: true, newId, slugChanged: true });
    } else {
      // Slug hasn't changed, just update normally
      const rows = (await sql`
        update recipes
        set
          title = coalesce(${payload.title}, title),
          summary = coalesce(${payload.summary}, summary),
          image = coalesce(${payload.image}, image),
          tag = coalesce(${payload.tag}, tag),
          vidid = coalesce(${payload.vidid}, vidid),
          story = coalesce(${payload.story ? JSON.stringify(payload.story) : null}::jsonb, story),
          ingredients = coalesce(${payload.ingredients ? JSON.stringify(payload.ingredients) : null}::jsonb, ingredients),
          steps = coalesce(${payload.steps ? JSON.stringify(payload.steps) : null}::jsonb, steps)
        where id = ${oldId}
        returning id
      `) as { id: string }[];

      if (!rows.length) {
        // Record doesn't exist, insert new one
        if (!payload.title || !payload.summary || !payload.image || !payload.tag) {
          return NextResponse.json(
            { error: "Missing fields for insert" },
            { status: 400 }
          );
        }

        await sql`
          insert into recipes (id, title, image, tag, summary, vidid, story, ingredients, steps)
          values (
            ${oldId},
            ${payload.title},
            ${payload.image},
            ${payload.tag},
            ${payload.summary},
            ${payload.vidid ?? "/images/recipes/tiktok-placeholder.svg"},
            ${JSON.stringify(payload.story ?? [])}::jsonb,
            ${JSON.stringify(payload.ingredients ?? [])}::jsonb,
            ${JSON.stringify(payload.steps ?? [])}::jsonb
          )
        `;
      }

      // Revalidate paths
      revalidatePath('/recipes');
      revalidatePath(`/recipes/${oldId}`);

      return NextResponse.json({ ok: true, newId: oldId, slugChanged: false });
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}