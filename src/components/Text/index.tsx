import React, { FC } from "react";
import { Text as BaseText, StyleSheet, TextProps } from "react-native";

interface Props extends TextProps {
  children?: React.ReactNode;
  type?: "big" | "normal";
}

export const Text: FC<Props> = ({ type = "normal", style, ...props }) => {
  return (
    <BaseText
      style={{
        ...css.text,
        ...css[type],
        ...(style as object),
      }}
      {...props}
    />
  );
};

const css = StyleSheet.create({
  text: {
    fontFamily: `"Inter", sans-serif`,
  },
  big: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  normal: {
    fontSize: 14,
    fontWeight: "500",
  },
});
