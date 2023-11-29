import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface Props extends ViewProps {}

export const ModalLayout: FC<Props> = ({ children, style, ...props }) => {
  return (
    <View style={{ ...css.container, ...(style as object) }} {...props}>
      {children}
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
    flex: 1,

    width: "90%",
    minWidth: 300,
    maxWidth: 360,
  },
});
