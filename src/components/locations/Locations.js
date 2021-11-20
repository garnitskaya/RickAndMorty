import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';

import './locations.scss';

const Locations = (props) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [ended, setEnded] = useState(false);


    const rickandmortyapi = new RickAndMortyService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onLocationLoading();
        rickandmortyapi
            .getAllLocation(offset)
            .then(onLocationLoaded)
            .catch(onError)
    }

    const onLocationLoading = () => {
        setNewItemLoading(true);
    }

    const onLocationLoaded = (newLocations) => {
        let ended = false;
        if (newLocations.length < 20) {
            ended = true;
        }

        setLocations(locations => [...locations, ...newLocations]);
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
        return arr.map(({ id, name, type, dimension, residents }) => {

            const resident = residents.map(item => {
                const idRegExp = /\/([0-9]*)$/;
                const idChar = item.match(idRegExp)[1];

                return (
                    <Link to={`/character/${idChar}`}
                        key={idChar}>
                        <img
                            src={`https://rickandmortyapi.com/api/character/avatar/${idChar}.jpeg`}
                            alt="character" />
                    </Link>
                )
            })

            return (
                <div className='locations__items'
                    key={id}>
                    <div className='locations__item'>
                        <span> name:</span>
                        <br />
                        {name}
                    </div>
                    <div className='locations__item'>
                        <span> type:</span>
                        <br />
                        {type}
                    </div>
                    <div className='locations__item'>
                        <span>dimension:</span>
                        <br />
                        {dimension}
                    </div>
                    <div className='locations__item'>
                        <span>residents:</span>
                        <br />
                        <div
                            className='locations__img'>
                            {resident}
                        </div>
                    </div>
                </div>)
        })
    }

    const location = renderItem(locations);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(spinner, errorMessage) ? location : null;

    return (
        <div className='locations'>
            <h2 className='locations__title'>Locations</h2>
            <div className='locations__list'>

                {spinner}
                {errorMessage}
                {content}

            </div>
            <button
                className='button button__load'
                disabled={newItemLoading}
                style={{ 'display': ended ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                load more
            </button>
        </div>
    )
}

export default Locations;