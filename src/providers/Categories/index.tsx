import React, { FC, useMemo } from "react";

import { categoriesStorageKey, colors } from "./config";
import { useStorage } from "../../hooks/useStorage";
import { CategoriesContext } from "./context";
import { CategoryType } from "./type";

interface Props {
  children?: React.ReactNode;
}
export const CategoriesProvider: FC<Props> = ({ children }) => {
  const { setValue, value, isLoaded } = useStorage(categoriesStorageKey);

  const categories = useMemo(() => {
    const list: CategoryType[] = [];

    const setDefault = () => {
      if (!isLoaded) return;
      list.push(...colors.map((color) => ({ color } as CategoryType)));
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
