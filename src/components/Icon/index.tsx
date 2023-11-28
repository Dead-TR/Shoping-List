import React, { FC } from "react";
import { SvgProps } from "react-native-svg";

import { systemIcons } from "./config";
import { IconType } from "./type";

interface Props extends SvgProps {
  icon: IconType;
}
export const Icon: FC<Props> = ({ icon, ...props }) => {
  const CurrentIcon = systemIcons[icon];

  return <CurrentIcon {...props} />;
};
