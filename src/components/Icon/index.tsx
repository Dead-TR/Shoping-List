import React, { FC } from "react";
import { SvgProps } from "react-native-svg";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

import { systemIcons } from "./config";
import { IconType } from "./type";

interface Props extends Omit<SvgProps, "style"> {
  icon: IconType;
  style: StyleProp<TextStyle & ViewStyle>;
}

export const Icon: FC<Props> = ({ icon, style, ...props }) => {
  const CurrentIcon = systemIcons[icon];

  return <CurrentIcon style={style} {...props} />;
};
