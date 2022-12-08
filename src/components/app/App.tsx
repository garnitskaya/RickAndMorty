import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import Spinner from '../spinner/Spinner';
import MainMenu from '../mainMenu/MainMenu';

import './app.css';

const MainPage = lazy(() => import('./../pages/MainPage'));
const CharactersPage = lazy(() => import('../pages/CharactersPage'));
const EpisodesPage = lazy(() => import('../pages/EpisodesPage'));
const LocationsPage = lazy(() => import('../pages/LocationsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SingleLocationLayout = lazy(() => import('../pages/singleLocationLayout/SingleLocationLayout'));
const SingleEpisodeLayout = lazy(() => import('../pages/singleEpisodeLayout/SingleEpisodeLayout'));
const Page404 = lazy(() => import('../pages/404'));


const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <div className='content'>
            <MainMenu />
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path='/RickAndMorty'>
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
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType='character' />
                </Route>
                <Route exact path="/locations/:id">
                  <SinglePage
                    Component={SingleLocationLayout}
                    dataType='location' />
                </Route>
                <Route exact path="/episodes/:id">
                  <SinglePage
                    Component={SingleEpisodeLayout}
                    dataType='episode' />
                </Route>
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App;
