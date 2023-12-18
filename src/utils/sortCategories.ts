import { CategoryType } from "../providers/Categories/type";

export const sortCategories = (categories: CategoryType[]) => {
  const categoriesCopy = JSON.parse(
    JSON.stringify(categories),
  ) as CategoryType[];

  return categoriesCopy.sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });
};
