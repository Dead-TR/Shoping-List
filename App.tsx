import { Component } from "react";
import "./src/fireBase";
import { Main } from "./src/Main";
import { Text } from "react-native";

export default function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ERROR:", error, errorInfo);
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <Text style={{ padding: 50 }}>Error</Text>;
    }

    //@ts-ignore
    return <>{this.props.children}</>;
  }
}
