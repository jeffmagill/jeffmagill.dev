'use client';

import React, { Component, ErrorInfo } from 'react';
import ErrorDisplay from './ErrorDisplay';

interface Props {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

/**
 * Error boundary component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the application.
 * Now uses the ErrorDisplay component for consistent error presentation.
 */
class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// You can log the error to an error reporting service
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				this.props.fallback || (
					<ErrorDisplay
						title='Something Went Wrong'
						message='We encountered an unexpected error.'
						details={this.state.error?.message}
					/>
				)
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
