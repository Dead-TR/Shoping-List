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
  const [defaultOpened, setDefaultOpened] = useState<
    CategoryType["color"] | null
  >(null);

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

    list.forEach((v) => {
      if (v.color === defaultOpened) v.defaultOpened = true;
      else v.defaultOpened = false;
    });
    return [...list];
  }, [value, isLoaded, defaultOpened]);

  const updateCategories = (value: CategoryType[]) => {
    try {
      setValue(value);
    } catch {}
  };

  const openCategory = (color: null | CategoryType["color"]) => {
    setDefaultOpened(color);
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, updateCategories, openCategory, isSync }}>
      {children}
    </CategoriesContext.Provider>
  );
};
