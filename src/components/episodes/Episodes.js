import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';
import { Link } from 'react-router-dom';

import './episodes.scss';

const Episodes = () => {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [ended, setEnded] = useState(false);

    const rickAndMortyService = new RickAndMortyService();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);


    const onRequest = (offset) => {
        onEpisodeLoading();
        rickAndMortyService
            .getAllEpisode(offset)
            .then(onEpisodeLoaded)
            .catch(onError)
    }

    const onEpisodeLoading = () => {
        setNewItemLoading(true);
    }

    const onEpisodeLoaded = (newEpisodes) => {
        let ended = false;
        if (newEpisodes.length < 20) {
            ended = true
        }

        setEpisodes(episodes => [...episodes, ...newEpisodes]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 1);
        setEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const renderItem = (arr) => {
        return arr.map(({ id, name, characters, airDate }) => {
            return (
                <div className='episodes__item' key={id}>
                    <Link to={`/episodes/${id}`} className='episodes__name'>Episode № {id} : {name}</Link>
                    <span className='episodes__date'>{airDate}</span>
                    <div className='episodes__img'>{characters}</div>
                </div>)
        })
    }

    const episode = renderItem(episodes);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? episode : null;

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
                onClick={() => onRequest(offset)}
            >
                load more
            </button>
        </div>
    )
}

export default Episodes;