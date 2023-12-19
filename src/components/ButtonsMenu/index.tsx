import React, { FC, Fragment } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { IconType } from "../Icon/type";
import { Button } from "../Button";
import { Icon } from "../Icon";

export interface ButtonsMenuProps {
  buttons: {
    icon: IconType;
    onPress?: () => void;
  }[];
  style?: StyleProp<TextStyle & ViewStyle>;
}

export const ButtonsMenu: FC<ButtonsMenuProps> = ({ buttons, style }) => {
  return (
    <View style={css.menu}>
      {buttons.map(({ icon, onPress }, i) => (
        <Fragment key={icon + i}>
          <Button style={css.button} onPress={onPress}>
            <Icon icon={icon} style={{ ...css.icon, ...(style as object) }} />
          </Button>
        </Fragment>
      ))}
    </View>
  );
};

const css = StyleSheet.create({
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  icon: {
    color: "#ffffff",
    minWidth: 35,
    minHeight: 35,
  },
  button: {
    padding: 20,
  },
});
