import React, { ReactElement, ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
interface Props {
  children: ReactNode;
  fallbackRender: FallbackRender;
}
interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = { error: null };
  static getDerivedStateFromError(error: Error): State {
    return { error: error };
  }
  render() {
    const { children, fallbackRender } = this.props;
    const { error } = this.state;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
