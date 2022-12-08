import { Link } from 'react-router-dom';
import { SinglePageProps } from '../../../types';
import { CharType } from '../../../types/character';

import './singleCharacterLayout.scss';

const SingleCharacterLayout: React.FC<SinglePageProps<CharType>> = ({ data, goBack, nextData }) => {
    const { name, status, species, image, locationName, gender, episodes, locationUrl } = data;

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
                <Link to={`/locations/${locationUrl}`} className='single-char__location'>
                    <span>Location: </span>{locationName}
                </Link>
                <div className='single-char__episode'>
                    <span>Episodes: </span>
                    <div className={'single-char__episode-items'}>{episodes}</div>
                </div>
            </div>
            <div className='single-char__buttons'>
                <button
                    type='button'
                    className='single-char__back'
                    onClick={goBack}>
                    <i className="fas fa-chevron-left"></i>
                    back
                </button>
                <button
                    type='button'
                    className='single-char__next'
                    onClick={nextData}>
                    Next
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;