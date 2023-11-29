import React, { FC, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";

interface Props extends Omit<TextInputProps, "onChange" | "onBlur"> {
  color?: string;
  container?: ViewProps;

  handleOk?: (v: string) => void;
}

export const Input: FC<Props> = ({
  style,
  color = "black",
  container,
  handleOk,
  ...props
}) => {
  const [value, setValue] = useState("");

  return (
    <View
      style={{
        ...css.container,
        ...(container?.style as object),
        //@ts-ignore
        color,
      }}>
      <TextInput
        placeholderTextColor={"#2D2D2D"}
        value={value}
        onChange={(e) => {
          setValue(e.nativeEvent.text);
        }}
        onBlur={() => handleOk && handleOk(value)}
        style={{
          ...css.input,
          ...(style as object),
        }}
        {...props}
      />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    borderColor: "transparent",
    borderBottomColor: "currentColor",
    borderStyle: "solid",
    borderWidth: 1,
  },
  input: {
    fontFamily: `"Inter", sans-serif`,
    fontSize: 14,
    fontWeight: "500",
    color: "currentColor",
  },
});
