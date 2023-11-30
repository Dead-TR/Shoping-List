import { colors } from "./config";

export type ColorType = (typeof colors)[number];

export interface CategoryType {
  color: ColorType;
  order?: number;
  name?: string;
}
