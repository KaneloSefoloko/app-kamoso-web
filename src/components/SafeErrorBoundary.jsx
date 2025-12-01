import React from 'react';

export default class SafeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        // Sanitize logs; never include PII/tokens
        console.error('UI error:', { message: error?.message });
    }
    render() {
        if (this.state.hasError) {
            return <div>Something went wrong. Please try again.</div>;
        }
        return this.props.children;
    }
}
