import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';
import { Link } from 'react-router-dom';

import './episodes.scss';

class Episodes extends Component {

    state = {
        episodes: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1,
        ended: false
    }

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onEpisodeLoading();
        this.rickAndMortyService
            .getAllEpisode(offset)
            .then(this.onEpisodeLoaded)
            .catch(this.OnError)
    }

    onEpisodeLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onEpisodeLoaded = (newEpisodes) => {
        let ended = false;
        if (newEpisodes.length < 20) {
            ended = true
        }

        this.setState(({ offset, episodes }) => ({
            episodes: [...episodes, ...newEpisodes],
            loading: false,
            newItemLoading: false,
            offset: offset + 1,
            ended: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItem = (arr) => {
        return arr.map(({ id, name, characters, airDate }) => {

            const character = characters.map(item => {
                const idRegExp = /\/([0-9]*)$/;
                const idChar = item.match(idRegExp)[1];

                return (
                    <Link to={`/${idChar}`} key={idChar} >
                        <img
                            src={`https://rickandmortyapi.com/api/character/avatar/${idChar}.jpeg`}
                            alt='character' />
                    </Link>
                )
            })

            return (
                <div className='episodes__item' key={id}>
                    <h3 className='episodes__name'>Episode {id} : {name}</h3>
                    <span className='episodes__date'>{airDate}</span>
                    <div className='episodes__img'>{character}</div>
                </div>)
        })
    }

    render() {
        const { episodes, loading, error, newItemLoading, offset, ended } = this.state;
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
                    disabled={newItemLoading}
                    style={{ 'display': ended ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}
                >
                    load more
                </button>
            </div>
        )
    }
}

export default Episodes;