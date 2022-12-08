import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

type ErrorBoundaryProps = {
    children: JSX.Element;
}

type ErrorBoundaryState = {
    error: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage >'Something went wrong...'</ErrorMessage >
        }
        return this.props.children
    }
};

