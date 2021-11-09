import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import RickAndMortyService from '../../../services/RickAndMortyService';

import './singleCharPage.scss';

const SingleCharPage = () => {
    const { charId } = useParams();

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const rickAndMortyService = new RickAndMortyService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        onCharLoading();
        rickAndMortyService
            .getCharacter(charId)
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

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ char }) => {
    const { name, status, species, image, locationName, gender, episode, locationUrl } = char;

    return (
        <div className='single-char'>
            <img src={image} alt={name} className='single-char__img' />
            <div className="single-char__info">
                <h2 className='single-char__name'>{name}</h2>
                <div className='single-char__gender'>
                    <span>Gender: </span>{gender}
                </div>
                <div className='single-char__status'>
                    <span>Status: </span>{status}
                </div>
                <div className='single-char__species'>
                    <span> Species: </span>{species}
                </div>
                <Link to={`/locations`} className='single-char__location'>
                    <span>Location: </span>{locationName}
                </Link>
                <div className='single-char__episode'>
                    <span>Episodes: </span>
                    <div>
                        {episode.map((item, i) => <Link to='/episodes' key={i}>{item}</Link>)}
                    </div>
                </div>
            </div>
            <Link className='single-char__back' to='/'>Back to all</Link>
        </div>
    )
}

export default SingleCharPage;