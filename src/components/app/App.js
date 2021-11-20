import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import MainMenu from './../mainMenu/MainMenu';
import { Page404, EpisodesPage, LocationsPage, MainPage, SingleCharPage } from '../pages';

import './app.css';

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <div className='char__content'>
                        <MainMenu />
                        <Switch>
                            <Route exact path='/'>
                                <MainPage />
                            </Route>
                            <Route exact path='/episodes'>
                                <EpisodesPage />
                            </Route>
                            <Route exact path='/locations'>
                                <LocationsPage />
                            </Route>
                            <Route exact path="/character/:charId">
                                <SingleCharPage />
                            </Route>
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </div>
                </main>
            </div>
        </Router>
    )
}

export default App;
