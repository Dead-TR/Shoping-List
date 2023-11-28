import React, { FC, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Routes } from "./Routes";

interface Props {
  children?: React.ReactNode;
}

export const Layout: FC<Props> = ({}) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={{ ...css.container, height, width }}>
      <Header />
      <ScrollView>
        <Routes />
      </ScrollView>
      <Footer />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    padding: 10,
  },
});
