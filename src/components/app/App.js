import Header from '../header/Header';
import CharList from './../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import MainMenu from '../mainMenu/MainMenu';

import './app.css';

const App = () => {

    return (
        <div className="App">
            <Header />

            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>

            <main className='char__content'>
                <MainMenu />
                <ErrorBoundary>
                    <CharList />
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App;
