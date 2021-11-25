import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import RandomChar from './../randomChar/RandomChar';

const MainPage = () => {
    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
        </>)
}

export default MainPage;