import { useContext } from "react";
import { CategoriesContext } from "./context";

export const useCategories = () => useContext(CategoriesContext);
