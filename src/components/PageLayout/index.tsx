import React, { FC, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Teleport } from "../Portal/Teleport";

interface Props {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PageLayout: FC<Props> = ({ children, footer, header }) => {
  return (
    <View style={css.layout}>
      <Teleport to="header">{header}</Teleport>

      <View>{children}</View>

      <Teleport to="footer">{footer}</Teleport>
    </View>
  );
};

const css = StyleSheet.create({
  layout: {},
});
