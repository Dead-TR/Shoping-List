import React, { FC, useEffect, useMemo, useState } from "react";
import { CategoriesContext } from "./context";
import { CategoryType } from "./type";
import { useStorage } from "../../hooks/useStorage";
import { categoriesStorageKey, colors } from "./config";

interface Props {
  children?: React.ReactNode;
}
export const CategoriesProvider: FC<Props> = ({ children }) => {
  const { setValue, value } = useStorage(categoriesStorageKey);

  const categories = useMemo(() => {
    const list: CategoryType[] = [];
    try {
      const parsedData = JSON.parse("" + value) as CategoryType[] | null;

      if (parsedData) list.push(...parsedData);
    } catch {
      list.push(...colors.map((color) => ({ color } as CategoryType)));
      setValue(JSON.stringify(list));
    }
    return list;
  }, [value]);

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
