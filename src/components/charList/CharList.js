import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import RickAndMortyService from './../../services/RickAndMortyService';
import Spinner from './../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);
    const [showInfo, setShowInfo] = useState(false);

    const rickAndMortyService = new RickAndMortyService();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);


    const onRequest = (offset) => {
        onCharListLoading();
        rickAndMortyService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 20) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 1);
        setCharEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onShowInfo = (id) => {
        setSelectedChar(id);
        setShowInfo(showInfo => !showInfo);
    }

    const renderItems = (arr) => {
        const items = arr.map(({ id, name, image, status, locationName, episode, species, gender }) => {

            const statusIcon = (status) => {
                switch (status) {
                    case "Dead":
                        return <i className="dead fas fa-skull-crossbones" />;
                    case "Alive":
                        return <i className="alive heartbeat fas fa-heartbeat" />;
                    case "unknown":
                        return <i className="unknown fas fa-question" />;
                    default:
                        break;
                }
            }

            const speciesIcon = (species) => {
                switch (species) {
                    case "Human":
                        return <i className="fas fa-male" />;
                    case "Alien":
                        return <i className="fab fa-reddit-alien" />;
                    case "Humanoid":
                        return <i className="fas fa-pastafarianism" />;
                    case "Robot":
                        return <i className="fas fa-robot" />;
                    case "Animal":
                        return <i className="fas fa-paw" />;
                    case "Disease":
                        return <i className="fas fa-disease" />;
                    case "Mythological Creature":
                        return <i className="fas fa-spider" />;
                    case "Poopybutthole":
                        return <i className="fab fa-snapchat-ghost" />;
                    case "Cronenberg":
                        return <i className="fas fa-bug" />;
                    default:
                        return <i className="unknown fas fa-question" />;
                }
            }

            const active = selectedChar === id && showInfo ? 'active' : '';

            return (
                <li className='char__card' key={id} >
                    <button
                        className='char__descr'
                        onClick={() => onShowInfo(id)}>
                        <i className="descr far fa-eye"></i>
                    </button>
                    <img className='char__img' src={image} alt={name} />
                    <div className='char__block char-item'>
                        <Link to={`/characters/${id}`} className='char-item__name'>{name.length > 15 ? `${name.slice(0, 14)}...` : name}</Link>
                        <div className='char-item__block'>
                            <div className='char-item__species'>
                                Species
                                {speciesIcon(species)}
                                {species}
                            </div>
                            <div className='char-item__status'>
                                Status
                                {statusIcon(status)}
                                {status}
                            </div>
                        </div>
                        <div className={`char-item__blocks ${active}`}>
                            <div className='char-item__label'>
                                Gender:<br />
                                <span>{gender}</span>
                            </div>
                            <div className='char-item__label'>
                                Location:<br />
                                <span>{locationName}</span>
                            </div>
                            <div className='char-item__label'>
                                First seen in::<br />
                                <span>Episodes № {episode}</span>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })

        const allCharList = items.length;

        return (
            <>
                <div className='char__count'>results: {allCharList}</div>
                <ul className='char__flex'>
                    {items}
                </ul>
            </>
        )
    }

    const { filterItem, searchItem, term, filter } = props;
    const items = renderItems(filterItem((searchItem(charList, term)), filter));

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null
    const content = !(loading, error) ? items : null;

    return (
        <div className='char__list'>
            {errorMessage}
            {spinner}
            {content}
            <button
                className='button button__load'
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>load more</button>
        </div>
    )
}

export default CharList