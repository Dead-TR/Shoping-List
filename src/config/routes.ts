import { FC } from "react";

import { PageOptions } from "./type";
import { List, _404 } from "../pages";

const setPage = (
  Component: (() => React.JSX.Element) | FC<any>,
  options?: PageOptions,
) => ({
  component: Component,
  options,
});

export const routes = {
  "/": setPage(List),
  "*": setPage(_404),
} as const;
