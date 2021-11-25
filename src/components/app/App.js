//import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import MainMenu from './../mainMenu/MainMenu';

import { MainPage, EpisodesPage, LocationsPage, Page404, SinglePage, CharactersPage } from './../pages';
import SingleCharacterLayout from './../pages/singleCharacterLayout/SingleCharacterLayout';
import SingleLocationLayout from './../pages/singleLocationLayout/SingleLocationLayout';
import SingleEpisodeLayout from './../pages/singleEpisodeLayout/SingleEpisodeLayout';

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
                            <Route exact path='/characters'>
                                <CharactersPage />
                            </Route>
                            <Route exact path='/episodes'>
                                <EpisodesPage />
                            </Route>
                            <Route exact path='/locations'>
                                <LocationsPage />
                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType='character' />
                            </Route>
                            <Route exact path="/locations/:id">
                                <SinglePage Component={SingleLocationLayout} dataType='location' />
                            </Route>
                            <Route exact path="/episodes/:id">
                                <SinglePage Component={SingleEpisodeLayout} dataType='episode' />
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
