import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import { Teleport } from "../Portal/Teleport";
import { IconType } from "../Icon/type";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ButtonsMenu, ButtonsMenuProps } from "../ButtonsMenu";

interface Props {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: ButtonsMenuProps["buttons"];
}

export const PageLayout: FC<Props> = ({ children, footer, header }) => {
  return (
    <View style={css.layout}>
      <Teleport to="header">{header}</Teleport>

      <View>{children}</View>

      <Teleport to="footer">
        <ButtonsMenu buttons={footer} />
      </Teleport>
    </View>
  );
};

const css = StyleSheet.create({
  layout: {},
});
