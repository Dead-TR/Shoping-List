import React, { FC } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import { Teleport } from "../Portal/Teleport";
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

      <ScrollView>{children}</ScrollView>

      <Teleport to="footer">
        <ButtonsMenu buttons={footer} />
      </Teleport>
    </View>
  );
};

const css = StyleSheet.create({
  layout: {},
});
