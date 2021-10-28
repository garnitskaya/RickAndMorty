import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';

import './episodes.scss';

class Episodes extends Component {

    state = {
        episodes: [],
        loading: true,
        error: false
    }

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.rickAndMortyService
            .getAllEpisode()
            .then(this.onEpisodeLoaded)
            .catch(this.OnError)
    }

    onEpisodeLoaded = (episodes) => {
        this.setState({
            episodes,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItem = (arr) => {
        return arr.map(({ id, name, characters }) => {

            const character = characters.map(item => {
                const idRegExp = /\/([0-9]*)$/;
                const idChar = item.match(idRegExp)[1];

                return (
                    <a href="#s" key={idChar} >
                        <img
                            src={`https://rickandmortyapi.com/api/character/avatar/${idChar}.jpeg`}
                            alt='character' />
                    </a>
                )
            })

            return (
                <div className='episodes__item' key={id}>
                    <h3 className='episodes__name'> {name} {id}:</h3>
                    <div className='episodes__img'>{character}</div>
                </div>)
        })
    }

    render() {
        const { episodes, loading, error } = this.state;
        const episode = this.renderItem(episodes);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(spinner, errorMessage) ? episode : null;

        return (
            <div className='episodes'>

                <h2 className='episodes__title'>Episodes </h2>
                <div className='episodes__list'>

                    {spinner}
                    {errorMessage}
                    {content}

                </div>
                <button
                    className='button__load button'
                //disabled={newItemLoading}
                //style={{ 'display': charEnded ? 'none' : 'block' }}
                //onClick={() => this.onRequest(offset)}
                >
                    load more
                </button>
            </div>
        )
    }
}

export default Episodes;