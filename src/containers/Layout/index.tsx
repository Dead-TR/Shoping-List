import React, { FC, useRef, useState } from "react";
import {
  SafeAreaView,
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
  const [header, setHeader] = useState(0);
  const [footer, setFooter] = useState(0);

  return (
    <>
      <SafeAreaView style={{ height, width, ...css.container }}>
        <Header onLayout={(width, height) => setHeader(height)} />
        <Routes />
        <Footer onLayout={(width, height) => setFooter(height)} />
      </SafeAreaView>
    </>
  );
};

const css = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    flex: 1,
  },
});
