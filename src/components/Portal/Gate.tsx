import * as React from "react";

import { PortalContext } from ".";
import { gates } from "../../config";

export const PortalGate = (props: {
  gateName: (typeof gates)[number];
  children?: (
    teleport: (gateName: string, element: React.ReactNode) => void,
  ) => React.ReactNode;
}) => {
  const { gateName, children } = props;
  return (
    <PortalContext.Consumer>
      {(value) => {
        return (
          <React.Fragment>
            {value.gates[gateName]}
            {children && children(value.teleport)}
          </React.Fragment>
        );
      }}
    </PortalContext.Consumer>
  );
};
