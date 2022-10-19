import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchEpisodes } from '../../redux/actions';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './episodes.scss';

const Episodes = () => {
    const { episodes, loading, error, newItemLoading, offset, ended } = useSelector(state => state.episodes);
    const dispatch = useDispatch();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        dispatch(fetchEpisodes(offset));
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