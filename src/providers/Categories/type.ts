import { colors } from "./config";

export interface CategoryType {
  color: (typeof colors)[number];
  order?: number;
  name?: string;
}
