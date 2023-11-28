import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {}

export const Button: FC<ButtonProps> = ({
  children,
  activeOpacity = 0.8,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} {...props}>
      {children}
    </TouchableOpacity>
  );
};
