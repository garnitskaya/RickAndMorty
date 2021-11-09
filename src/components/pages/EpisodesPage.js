import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import Episodes from './../episodes/Episodes';

const EpisodesPage = () => {
    return (
        <ErrorBoundary>
            <Episodes />
        </ErrorBoundary>
    )
}

export default EpisodesPage;