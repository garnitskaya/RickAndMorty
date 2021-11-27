import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import RickAndMortyService from './../../services/RickAndMortyService';
import Spinner from './../spinner/Spinner';
import SearchPanel from './../searchPanel/SearchPanel';
import ItemFilter from './../itemFilter/ItemFilter';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);
    const [term, setTerm] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [filter, setFilter] = useState('');

    const rickAndMortyService = new RickAndMortyService();

    useEffect(() => {
        onRequest(offset, filter);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, filter) => {
        onCharListLoading();
        rickAndMortyService
            .getAllCharacters(offset, filter)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const updateFilterChar = (offset, filter) => {
        onCharListLoading();
        rickAndMortyService
            .getAllCharacters(offset, filter)
            .then(onCharFilterLoaded)
            .catch(onError)
    }

    const onCharFilterLoaded = (charList) => {
        let ended = false;
        if (charList.length < 20) {
            ended = true;
        }

        let offset = 1;
        if (offset < 2) {
            offset = 2;
        }

        setCharList(charList);
        setLoading(false);
        setNewItemLoading(false);
        setCharEnded(ended);
        setOffset(offset);
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
        setOffset(offset + 1);
        setCharEnded(ended);
        setFilter(filter)
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

    const searchItem = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }

    const onFilterChange = (filter) => {
        setFilter(filter);
    }

    const items = renderItems(searchItem(charList, term));

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? items : null;

    console.log(offset)
    return (
        <div className='char__list'>
            <div className='char__select'>
                <SearchPanel onUpdateSearch={onUpdateSearch} />
                <ItemFilter onFilterChange={onFilterChange} updateFilterChar={updateFilterChar} />
            </div>
            {errorMessage}
            {spinner}
            {content}
            <button
                className='button button__load'
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset, filter)}>load more</button>
        </div>
    )
}

export default CharList