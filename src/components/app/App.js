import Header from '../header/Header';
import CharList from './../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import MainMenu from '../mainMenu/MainMenu';

import './app.css';
import Episodes from '../episodes/Episodes';
import Location from './../locations/Locations';

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
                <Episodes />
                <Location />
            </main>
        </div>
    )
}

export default App;
