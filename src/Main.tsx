import React, { FC } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { Providers } from "./providers";
import { Layout } from "./containers/Layout";

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
      </Providers>
    </>
  );
};
