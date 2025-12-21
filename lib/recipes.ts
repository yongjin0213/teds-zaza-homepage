import { sql } from "./db";

export type Recipe = {
  id: string;
  title: string;
  image: string;
  tag: string;
  summary: string;
  videoImage: string;
  story: string[];
  ingredients: string[];
  steps: string[];
};

type DbRecipe = {
  id: string;
  title: string;
  image: string;
  tag: string;
  summary: string;
  video_image: string;
  story: unknown;
  ingredients: unknown;
  steps: unknown;
};

const normalizeList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const mapRecipe = (row: DbRecipe): Recipe => ({
  id: row.id,
  title: row.title,
  image: row.image,
  tag: row.tag,
  summary: row.summary,
  videoImage: row.video_image,
  story: normalizeList(row.story),
  ingredients: normalizeList(row.ingredients),
  steps: normalizeList(row.steps),
});

export const getRecipes = async (): Promise<Recipe[]> => {
  const rows = (await sql`
    select id, title, image, tag, summary, video_image, story, ingredients, steps
    from recipes
    order by created_at desc
  `) as DbRecipe[];
  return rows.map(mapRecipe);
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const rows = (await sql`
    select id, title, image, tag, summary, video_image, story, ingredients, steps
    from recipes
    where id = ${id}
    limit 1
  `) as DbRecipe[];
  return rows.length ? mapRecipe(rows[0]) : null;
};

export const getRecipeIds = async (): Promise<string[]> => {
  const rows = (await sql`
    select id from recipes order by created_at desc
  `) as { id: string }[];
  return rows.map((row) => row.id);
};
