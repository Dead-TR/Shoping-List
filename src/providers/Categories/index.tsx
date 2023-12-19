import React, { FC, useMemo, useState } from "react";

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
  const { setValue, value, isLoaded, isSync } = useStorage<CategoryType>(
    CATEGORIES_STORAGE_KEY,
  );

  const categories = useMemo(() => {
    const list: CategoryType[] = [];

    const setDefault = () => {
      if (!isLoaded) return;
      list.push(...colors.map((color) => ({ color } as CategoryType)));
      sortCategories(list);
    };

    try {
      if (value.length) list.push(...value);
      else setDefault();
    } catch {
      setDefault();
    }

    return [...list];
  }, [value, isLoaded]);

  const updateCategories = (value: CategoryType[]) => {
    try {
      setValue(value);
    } catch {}
  };

  const openCategory = (
    color: null | CategoryType["color"],
    isOpened: boolean,
  ) => {
    // setDefaultOpened(color);
    const current = categories.find((c) => c.color === color);
    if (current) {
      current.opened = isOpened;
      updateCategories([...categories]);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, updateCategories, openCategory, isSync }}>
      {children}
    </CategoriesContext.Provider>
  );
};
