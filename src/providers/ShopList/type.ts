import { ColorType } from "../Categories/type";

export interface ShopElement {
  text: string;
  isComplete: boolean;
  id: number;
}

export interface ShopListContextType {
  list: Record<ColorType, ShopElement[]>;
  addElement: (color: ColorType, value: string) => void;
  complete: (color: ColorType, id: number) => void;
}
