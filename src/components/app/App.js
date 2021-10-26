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


                <div className='char__content'>
                    <ErrorBoundary>
                        <CharList />
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    )
}

export default App;
