import { createContext } from "react";
import { ShopListContextType } from "./type";

export const ShopListContext = createContext<ShopListContextType>({
  list: {},
  complete: () => {},
  addElement: () => {},
  editElement: () => {},
  removeElement: () => {},
  updateList: () => {},
  clear: () => {},
});
