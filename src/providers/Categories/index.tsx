import React, { FC, useEffect, useMemo, useState } from "react";
import { CategoriesContext } from "./context";
import { CategoryType } from "./type";
import { useStorage } from "../../hooks/useStorage";
import { categoriesStorageKey, colors } from "./config";

interface Props {
  children?: React.ReactNode;
}
export const CategoriesProvider: FC<Props> = ({ children }) => {
  const { setValue, value, isLoaded } = useStorage(categoriesStorageKey);
  console.log("🚀 ~ file: index.tsx:12 ~ value:", value);

  const categories = useMemo(() => {
    const list: CategoryType[] = [];
    debugger;

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
