import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { modals, routes } from "./routes";
import { gates } from "./gates";
import { ModalContextType } from "../providers/Modal/type";

export type PageOptions =
  | NativeStackNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => NativeStackNavigationOptions);

export type RoutesNames = keyof typeof routes;
export type ModalNames = keyof typeof modals;

export type Gates = (typeof gates)[number];

export interface ModalProps {
  onClose: () => void;
  state: ModalContextType["state"];
}
