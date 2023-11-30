import { useContext } from "react";
import { ShopListContext } from "./context";

export const useShopList = () => useContext(ShopListContext);
