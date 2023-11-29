import React, { FC } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { Providers } from "./providers";
import { Layout } from "./containers/Layout";
import { PortalGate } from "./components/Portal/Gate";
import { ModalContainer } from "./containers/Modal";

interface Props {
  children?: React.ReactNode;
}
export const Main: FC<Props> = ({}) => {
  return (
    <>
      <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />

      <Providers>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout />
        </SafeAreaView>
        <ModalContainer />
      </Providers>
    </>
  );
};
