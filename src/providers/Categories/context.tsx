import { createContext, useContext } from "react";
import { CategoryType } from "./type";

export const CategoriesContext = createContext<{
  isSync: boolean;
  categories: CategoryType[];
  updateCategories: (v: CategoryType[]) => void;
  openCategory: (color: null | CategoryType["color"]) => void;
}>({
  categories: [],
  isSync: false,
  updateCategories: () => {},
  openCategory: () => {},
});
