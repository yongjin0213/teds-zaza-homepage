import { getRecipes } from "@/lib/recipes";
import RecipesClient from "./RecipesClient";

export default async function RecipesPage() {
  const recipes = await getRecipes();
  return <RecipesClient recipes={recipes} />;
}
