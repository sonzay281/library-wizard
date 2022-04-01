import React, { Component } from "react";

/***
 * Error Boundary
 * This component catches and log the errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // TODO : Handle runtime errors here
  }

  handleReport = () => {
    this.setState({ hasError: false });
    // TODO: Implement what to do when  user opt to report
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      //some fancy fall back screen
      return <button onClick={this.handleReport}>Report feedback</button>;
    }
    //when there's no, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
