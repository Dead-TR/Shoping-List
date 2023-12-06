import React, { FC } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";

import { PortalProvider } from "../components/Portal";
import { ModalProvider } from "./Modal";
import { CategoriesProvider } from "./Categories";
import { ShopListProvider } from "./ShopList";

interface Props {
  children?: React.ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: "#1E1E1E",
            border: "#ffffff",
            card: "#ff0000",
            notification: "#1e1e1e",
            primary: "#10a8a6",
            text: "#ffffff",
          },
        }}>
        <ModalProvider>
          <CategoriesProvider>
            <ShopListProvider>
              <PortalProvider>{children}</PortalProvider>
            </ShopListProvider>
          </CategoriesProvider>
        </ModalProvider>
      </NavigationContainer>
    </>
  );
};
