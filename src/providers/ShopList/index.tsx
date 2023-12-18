import React, { FC, useMemo } from "react";

import { useStorage } from "../../hooks/useStorage";
import { ColorType } from "../Categories/type";
import { ShopListContext } from "./context";
import { ShopElement, ShopListContextType, StorageShopElement } from "./type";
import { SHOP_LIST_KEY } from "../../hooks/config";
import { useCategories } from "../Categories/hook";

interface Props {
  children?: React.ReactNode;
}

export const ShopListProvider: FC<Props> = ({ children }) => {
  const { setValue, value, isSync } =
    useStorage<StorageShopElement>(SHOP_LIST_KEY);
  const { openCategory } = useCategories();

  const list = useMemo(() => {
    try {
      return value.reduce((acm, data) => {
        acm[data.color] = data;
        return acm;
      }, {} as ShopListContextType["list"]);
    } catch {
      return {} as ShopListContextType["list"];
    }
  }, [value]);

  const updateList = () => {
    try {
      const storageElement = Object.entries(list).map(([color, data]) => {
        return { ...data } as StorageShopElement;
      });

      setValue(storageElement);
    } catch (e) {
      console.error("addElement Error: ", e);
    }
  };

  const addElement = (color: ColorType, value: string) => {
    const currentTime = Date.now();
    if (!list[color])
      list[color] = {
        color,
        id: currentTime,
        list: [],
        saveTime: currentTime,
      };

    list[color].list.push({
      id: currentTime,
      isComplete: false,
      text: value,
    });

    updateList();
    openCategory(color);
  };

  const removeElement = (id: number) => {
    for (const color in list) {
      list[color].list = list[color].list.filter((e) => e.id !== id);
    }

    updateList();
  };

  const editElement = (id: number, text: string, color: ColorType) => {
    let currentElement: ShopElement;

    for (const color in list) {
      const current = list[color].list.find((e) => e.id === id);

      if (current) {
        currentElement = current;
        list[color].list = list[color].list.filter((e) => e.id !== id);
        break;
      }
    }

    if (currentElement) {
      currentElement.text = text;

      if (!list[color]) {
        const currentTime = Date.now();
        list[color] = {
          color,
          id: currentTime,
          list: [],
          saveTime: currentTime,
        };
      }

      list[color].push(currentElement);
    }

    updateList();
  };

  const complete = (id: number) => {
    let currentElement: ShopElement;
    let currentStorage: StorageShopElement;

    for (const color in list) {
      const current = list[color].list.find((e) => e.id === id);

      if (current) {
        currentElement = current;
        currentStorage = list[color];
        break;
      }
    }

    if (currentElement) {
      if (currentElement.isComplete === undefined)
        currentElement.isComplete = false;
      currentElement.isComplete = !currentElement.isComplete;
      currentStorage.saveTime = Date.now();
    }

    updateList();
  };

  const clear = (color: string) => {
    if (list[color]) {
      list[color].length = 0;
    }

    updateList();
  };

  return (
    <ShopListContext.Provider
      value={{
        isSync,
        list,
        complete,
        addElement,
        editElement,
        removeElement,
        updateList,
        clear,
      }}>
      {children}
    </ShopListContext.Provider>
  );
};
