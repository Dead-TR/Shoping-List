import * as React from "react";

export const PortalContext = React.createContext({
  gates: {},
  teleport: (gateName: string, element: React.ReactNode) => {
    return;
  },
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
        value={{ gates: this.state.gates, teleport: this.teleport }}>
        {children}
      </PortalContext.Provider>
    );
  }

  private teleport = (gateName: string, element: JSX.Element) =>
    this.setState({ gates: { ...this.state.gates, [gateName]: element } });
}
