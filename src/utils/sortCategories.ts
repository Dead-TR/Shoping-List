import { CategoryType } from "../providers/Categories/type";

export const sortCategories = (categories: CategoryType[]) =>
  categories.sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });