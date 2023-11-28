import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { PortalGate } from "../../components/Portal/Gate";

interface Props {
  onLayout?: (width: number, height: number) => void;
}

export const Header: FC<Props> = ({ onLayout }) => {
  return (
    <View
      style={css.container}
      onLayout={({ nativeEvent: { layout } }) => {
        onLayout && onLayout(layout.width, layout.height);
      }}>
      <PortalGate gateName={"header"} />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
