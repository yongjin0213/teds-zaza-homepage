import { getRecipes } from "@/lib/recipes";
import RecipesClient from "./RecipesClient";
export const dynamic = 'force-dynamic';
export default async function RecipesPage() {
  const recipes = await getRecipes();
  return <RecipesClient recipes={recipes} />;
}
