import React, { FC } from "react";
import { Text } from "react-native";

interface Props {
  children?: React.ReactNode;
}
export const _404: FC<Props> = ({}) => {
  return <Text>Wrong Page</Text>;
};
