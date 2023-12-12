import React, { FC, useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  AvoidSoftInput,
  AvoidSoftInputView,
} from "react-native-avoid-softinput";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Routes } from "./Routes";

interface Props {
  children?: React.ReactNode;
}


export const Layout: FC<Props> = ({}) => {
  const { height, width } = useWindowDimensions();

  const avoidRegister = useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);

    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  useFocusEffect(avoidRegister);

  return (
    <>
      <AvoidSoftInputView avoidOffset={0} style={css.container}>
        <SafeAreaView style={{ height, width, ...css.container }}>
          <Header />
          <Routes />
          <Footer />
        </SafeAreaView>
      </AvoidSoftInputView>
    </>
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 20,
    flex: 1,
  },
});
