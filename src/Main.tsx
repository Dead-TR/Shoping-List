import React, { FC } from "react";
import { StatusBar } from "react-native";

import { Providers } from "./providers";
import { Layout } from "./containers/Layout";
import { ModalContainer } from "./containers/Modal";

interface Props {
  children?: React.ReactNode;
}
export const Main: FC<Props> = ({}) => {
  return (
    <>
      <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />

      <Providers>
        <Layout />
        <ModalContainer />
      </Providers>
    </>
  );
};
