import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import RandomChar from './../randomChar/RandomChar';
import CharList from './../charList/CharList';

const MainPage = () => {
    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <ErrorBoundary>
                <CharList />
            </ErrorBoundary>
        </>)
}

export default MainPage;