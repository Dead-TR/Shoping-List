import { ContentElement } from "../../hooks/type";
import { ColorType } from "../Categories/type";

export interface ShopElement {
  text: string;
  isComplete: boolean;
  id: number;
}

export interface StorageShopElement extends ContentElement {
  color: ColorType;
  list: ShopElement[];
}

export interface ShopListContextType {
  /**
   * Record<color, list>
   **/
  list: Record<ColorType, StorageShopElement>;
  addElement: (color: ColorType, value: string) => void;
  complete: (id: number) => void;

  removeElement: (id: number) => void;
  editElement: (id: number, text: string, color: ColorType) => void;
  clear: (color: string) => void;
  updateList: () => void;

  isSync: boolean;
}
