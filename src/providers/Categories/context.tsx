import { createContext, useContext } from "react";
import { CategoryType } from "./type";

export const CategoriesContext = createContext<{
  categories: CategoryType[];
  updateCategories: (v: CategoryType[]) => void;
}>({ categories: [], updateCategories: () => {} });
