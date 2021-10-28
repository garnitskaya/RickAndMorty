import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import CharList from './../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Episodes from '../episodes/Episodes';
import Location from './../locations/Locations';
import MainMenu from './../mainMenu/MainMenu';

import './app.css';

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>

                    <div className='char__content'>
                        <MainMenu />
                        <Switch>
                            <ErrorBoundary>
                                <Route exact path='/'>
                                    <CharList />
                                </Route>
                                <Route exact path='/episodes'>
                                    <Episodes />
                                </Route>
                                <Route exact path='/locations'>
                                    <Location />
                                </Route>
                            </ErrorBoundary>
                        </Switch>
                    </div>
                </main>
            </div>
        </Router>
    )
}

export default App;
