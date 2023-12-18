import { ContentElement } from "../../hooks/type";
import { colors } from "./config";

export type ColorType = (typeof colors)[number];

export interface CategoryType extends ContentElement {
  color: ColorType;
  order?: number;
  name?: string;

  defaultOpened?: boolean;
}
