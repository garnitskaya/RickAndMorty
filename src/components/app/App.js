import RickAndMortyService from './../../services/RickAndMortyService';
import Header from '../header/Header';
import CharList from './../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

import './app.css';

function App() {
    const rickandmortyapi = new RickAndMortyService();
    rickandmortyapi.getAllCharacters();
    return (
        <div className="App">
            <Header />
            <main>
                <RandomChar />
                <CharList />
            </main>
        </div>
    );
}

export default App;
