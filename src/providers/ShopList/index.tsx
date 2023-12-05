import React, { FC, useMemo } from "react";

import { useStorage } from "../../hooks/useStorage";
import { ColorType } from "../Categories/type";
import { ShopListContext } from "./context";
import { ShopElement, ShopListContextType } from "./type";
import { shopListKey } from "./config";

interface Props {
  children?: React.ReactNode;
}

export const ShopListProvider: FC<Props> = ({ children }) => {
  const { setValue, value } = useStorage(shopListKey);

  const list = useMemo(() => {
    try {
      const parsedList = JSON.parse("" + value) as
        | ShopListContextType["list"]
        | null;
      if (parsedList) return parsedList;
      else return {} as ShopListContextType["list"];
    } catch {
      return {} as ShopListContextType["list"];
    }
  }, [value]);

  const updateList = () => {
    try {
      const stringList = JSON.stringify(list);
      if (stringList) setValue(stringList);
    } catch (e) {
      console.error("addElement Error: ", e);
    }
  };

  const addElement = (color: ColorType, value: string) => {
    if (!list[color]) list[color] = [];

    list[color].push({
      id: Date.now(),
      isComplete: false,
      text: value,
    });

    updateList();
  };

  const removeElement = (id: number) => {
    for (const color in list) {
      list[color] = list[color].filter((e) => e.id !== id);
    }

    updateList();
  };

  const editElement = (id: number, text: string, color: ColorType) => {
    let currentElement: ShopElement;

    for (const color in list) {
      const current = list[color].find((e) => e.id === id);

      if (current) {
        currentElement = current;
        list[color] = list[color].filter((e) => e.id !== id);
        break;
      }
    }

    if (currentElement) {
      currentElement.text = text;

      if (!list[color]) list[color] = [];

      list[color].push(currentElement);
    }

    updateList();
  };

  const complete = (id: number) => {
    let currentElement: ShopElement;

    for (const color in list) {
      const current = list[color].find((e) => e.id === id);

      if (current) {
        currentElement = current;
        break;
      }
    }

    if (currentElement) {
      if (currentElement.isComplete === undefined)
        currentElement.isComplete = false;
      currentElement.isComplete = !currentElement.isComplete;
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
