import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCharacter } from './../../redux/actions/character';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';

const RandomChar = () => {
    const { char, loading, error } = useSelector(state => state.character);
    const dispatch = useDispatch();

    useEffect(() => {
        updateChar();
        const timeId = setInterval(updateChar, 100000);

        return () => clearInterval(timeId);
    }, []);

    const updateChar = () => {
        const id = Math.floor(Math.random() * (670 - 1) + 1);
        dispatch(fetchCharacter(id));
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
        </div>
    )
}
export default RandomChar;
