import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
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
    console.error('LexiClear UI Error Boundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          aria-live="assertive"
          className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 text-slate-100"
        >
          <div className="max-w-md w-full bg-slate-900/90 border border-red-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center space-y-4">
            <div className="inline-flex p-4 bg-red-500/10 text-red-400 rounded-full ring-8 ring-red-500/5">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Something went wrong</h1>
            <p className="text-sm text-slate-400">
              An unexpected rendering error occurred. The application remains protected against data loss.
            </p>
            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-left overflow-x-auto text-xs font-mono text-red-300">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/25 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Platform
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
