import { sql } from "@/lib/db";
import type { Post } from "./types";

type DbRecipe = {
  id: string;
  title: string;
  summary: string;
  image: string;
  tag: string;
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

export const getAdminPosts = async (): Promise<Post[]> => {
  const rows = (await sql`
    select id, title, summary, image, tag, video_image, story, ingredients, steps
    from recipes
    order by created_at desc
  `) as DbRecipe[];

  return rows.map((row) => {
    const story = normalizeList(row.story);
    const ingredients = normalizeList(row.ingredients);
    const steps = normalizeList(row.steps);

    return {
      id: row.id,
      title: row.title,
      description: row.summary,
      inspiration: story[0] ?? "",
      ingredients: ingredients.join(", "),
      steps: steps.join("\n"),
      thumbnail: row.image,
      videoEmbed: row.video_image,
      tag: row.tag,
    } satisfies Post;
  });
};
