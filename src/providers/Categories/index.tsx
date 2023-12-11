import React, { FC, useMemo } from "react";

import { colors } from "./config";
import { CategoryType } from "./type";
import { sortCategories } from "../../utils";
import { CategoriesContext } from "./context";
import { useStorage } from "../../hooks/useStorage";
import { CATEGORIES_STORAGE_KEY } from "../../hooks/config";

interface Props {
  children?: React.ReactNode;
}
export const CategoriesProvider: FC<Props> = ({ children }) => {
  const { setValue, value, isLoaded } = useStorage(CATEGORIES_STORAGE_KEY);

  const categories = useMemo(() => {
    const list: CategoryType[] = [];

    const setDefault = () => {
      if (!isLoaded) return;
      list.push(...colors.map((color) => ({ color } as CategoryType)));
      sortCategories(list);
      setValue(JSON.stringify(list));
    };

    try {
      const parsedData = JSON.parse("" + value) as CategoryType[] | null;

      if (parsedData) list.push(...parsedData);
      else setDefault();
    } catch {
      setDefault();
    }
    return list;
  }, [value, isLoaded]);

  const updateCategories = (value: CategoryType[]) => {
    try {
      const strValue = JSON.stringify(value);
      setValue(strValue);
    } catch {}
  };

  return (
    <CategoriesContext.Provider value={{ categories, updateCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
