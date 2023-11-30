import React, { FC, useMemo } from "react";

import { useStorage } from "../../hooks/useStorage";
import { ColorType } from "../Categories/type";
import { ShopListContext } from "./context";
import { ShopListContextType } from "./type";
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

  const complete = (color: ColorType, id: number) => {
    const currentElement = list[color].find((e) => e.id === id);
    if (currentElement) currentElement.isComplete = !currentElement.isComplete;

    updateList();
  };

  return (
    <ShopListContext.Provider
      value={{
        list,
        addElement,
        complete,
      }}>
      {children}
    </ShopListContext.Provider>
  );
};