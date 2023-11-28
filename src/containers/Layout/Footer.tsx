import React, { FC } from "react";

import { PortalGate } from "../../components/Portal/Gate";
import { StyleSheet, View } from "react-native";

interface Props {
  onLayout?: (width: number, height: number) => void;
}

export const Footer: FC<Props> = ({ onLayout }) => {
  return (
    <View
      style={css.container}
      onLayout={({ nativeEvent: { layout } }) => {
        onLayout && onLayout(layout.width, layout.height);
      }}>
      <PortalGate gateName="footer" />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
