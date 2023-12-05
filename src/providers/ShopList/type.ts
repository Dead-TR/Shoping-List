import { ColorType } from "../Categories/type";

export interface ShopElement {
  text: string;
  isComplete: boolean;
  id: number;
}

export interface ShopListContextType {
  list: Record<ColorType, ShopElement[]>;
  addElement: (color: ColorType, value: string) => void;
  complete: (id: number) => void;

  removeElement: (id: number) => void;
  editElement: (id: number, text: string, color: ColorType) => void;
}
