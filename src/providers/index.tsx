import React, { FC } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";

import { PortalProvider } from "../components/Portal";
import { ModalProvider } from "./Modal";
import { CategoriesProvider } from "./Categories";

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
            border: "#1E1E1E",
            card: "#1E1E1E",
            notification: "#1E1E1E",
            primary: "#1E1E1E",
            text: "#ffffff",
          },
        }}>
        <ModalProvider>
          <CategoriesProvider>
            <PortalProvider>{children}</PortalProvider>
          </CategoriesProvider>
        </ModalProvider>
      </NavigationContainer>
    </>
  );
};
