import React, { FC, useContext, useEffect } from "react";
import { useTeleport } from "./useTeleport";
import { gates } from "../../config";

interface Props {
  children?: React.ReactNode;
  to: (typeof gates)[number];
}

export const Teleport: FC<Props> = ({ children, to }) => {
  const { teleport, gates } = useTeleport();

  useEffect(() => {
    gates[to] = children;
    teleport(to, children);
  }, [children, to]);

  return null;
};
