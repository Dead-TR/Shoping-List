import React, { FC, Fragment } from "react";
import { IconType } from "../Icon/type";
import { StyleSheet, View } from "react-native";
import { Button } from "../Button";
import { Icon } from "../Icon";

export interface ButtonsMenuProps {
  buttons: {
    icon: IconType;
    onPress?: () => void;
  }[];
}

export const ButtonsMenu: FC<ButtonsMenuProps> = ({ buttons }) => {
  return (
    <View style={css.menu}>
      {buttons.map(({ icon, onPress }, i) => (
        <Fragment key={icon + i}>
          <Button onPress={onPress}>
            <Icon icon={icon} />
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
    gap: 40,
    color: "white",
  },
});
