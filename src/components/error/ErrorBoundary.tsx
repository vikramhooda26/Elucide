// ErrorBoundary.tsx
import React, { Component, ReactNode } from "react";
import ErrorPage from "./ErrorPage";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        console.log("ErrorBoundary caught an error:", error);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
