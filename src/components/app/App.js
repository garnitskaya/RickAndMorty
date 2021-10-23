import Header from '../header/Header';
import CharList from './../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.css';

const App = () => {

    return (
        <div className="App">
            <Header />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharList />
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App;
