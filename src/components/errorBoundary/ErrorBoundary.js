import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

export default class ErrorBoundary extends Component {

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
            return <ErrorMessage>'Something went wrong...'</ErrorMessage>
        }
        return this.props.children
    }
};

