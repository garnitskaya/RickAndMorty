import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';

import './randomChar.scss';
import { Link } from 'react-router-dom';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const rickAndMortyService = new RickAndMortyService();

    useEffect(() => {
        updateChar();
        const timeId = setInterval(updateChar, 100000);

        return () => clearInterval(timeId);
        // eslint-disable-next-line
    }, []);

    const updateChar = () => {
        const id = Math.floor(Math.random() * (670 - 1) + 1);

        onCharLoading();
        rickAndMortyService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className='randomchar'>

            {spinner}
            {errorMessage}
            {content}

            <button
                className='button button__random'
                onClick={updateChar}>
                try it
            </button>
        </div>
    )
}

const View = ({ char }) => {
    const { id, name, image } = char;
    return (
        <div className='randomchar__card'>
            <img src={image} alt={name} />
            <Link to={`/characters/${id}`} className='randomchar__name' >
                <h2>{name}</h2>
            </Link>
        </div >
    )
}
export default RandomChar;