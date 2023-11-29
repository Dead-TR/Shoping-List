import * as React from "react";
import { Gates } from "../../config/type";

export const PortalContext = React.createContext({
  gates: {},
  teleport: (gateName: Gates, element: React.ReactNode) => {},
  clear: (gateName: Gates) => {},
});

interface IProps {
  children: React.ReactNode;
}

export class PortalProvider extends React.Component<IProps> {
  public state = {
    gates: {},
  };

  public render() {
    const { children } = this.props;
    return (
      <PortalContext.Provider
        value={{
          gates: this.state.gates,
          teleport: this.teleport,
          clear: this.clear,
        }}>
        {children}
      </PortalContext.Provider>
    );
  }

  private teleport = (gateName: Gates, element: JSX.Element) =>
    this.setState({ gates: { ...this.state.gates, [gateName]: element } });

  private clear = (gateName: Gates) =>
    this.setState((old) => {
      delete old[gateName];
      return { ...old };
    });
}
