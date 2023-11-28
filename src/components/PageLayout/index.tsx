import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import { Teleport } from "../Portal/Teleport";
import { IconType } from "../Icon/type";
import { Button } from "../Button";
import { Icon } from "../Icon";

interface Props {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: {
    icon: IconType;
    onPress?: () => void;
  }[];
}

export const PageLayout: FC<Props> = ({ children, footer, header }) => {
  return (
    <View style={css.layout}>
      <Teleport to="header">{header}</Teleport>

      <View>{children}</View>

      <Teleport to="footer">
        <View style={css.footer}>
          {footer.map(({ icon, onPress }) => (
            <Button onPress={onPress}>
              <Icon icon={icon} />
            </Button>
          ))}
        </View>
      </Teleport>
    </View>
  );
};

const css = StyleSheet.create({
  layout: {},
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    color: "white",
  },
});
