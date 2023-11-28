import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { routes } from "./routes";

export type PageOptions =
  | NativeStackNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => NativeStackNavigationOptions);

export type RoutesNames = keyof typeof routes;
