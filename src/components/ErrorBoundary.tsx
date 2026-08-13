'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in Evolvith DXP:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 text-center">
          <div className="glass-panel p-10 rounded-3xl border border-red-500/30 max-w-md space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-xl font-bold mx-auto">
              !
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Component Error Intercepted
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              EEOS Error Boundary isolated a component failure gracefully. Core system operating services remain operational.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="btn-primary px-6 py-2.5 text-xs"
            >
              Retry Component Render
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
