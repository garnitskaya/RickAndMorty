import { Component } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import RickAndMortyService from './../../services/RickAndMortyService';
import SearchPanel from './../searchPanel/SearchPanel';
import Spinner from './../spinner/Spinner';

import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1,
        charEnded: false,
        term: ''
    }

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.onRequest();
        //window.addEventListener('scroll', this.handleScroll)
    }

    //handleScroll = () => {
    //    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //*прокрученая часть+видимая часть, если сумма будет>= scrollHeight, то это значит что пользователь долистал до конца
    //        this.onRequest(this.state.offset);
    //        if (this.state.offset >= 34) {
    //            window.removeEventListener('scroll', this.handleScroll);
    //        }
    //    }
    //}

    //componentWillUnmount() {
    //    window.removeEventListener('scroll', this.handleScroll);
    //}

    onRequest = (offset) => {
        this.onCharListLoading();
        this.rickAndMortyService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 20) {
            ended = true;
        }

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 1,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    searchItem = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
    }

    onUpdateSearch = (term) => {
        this.setState({ term })
    }

    renderItems = (arr) => {
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

            return (
                <li className='char__card' key={id} >

                    <button
                        className='char__descr'
                        onClick={() => console.log(id)}>
                        <i className="descr far fa-eye"></i>
                    </button>
                    <img className='char__img' src={image} alt={name} />

                    <div className='char__block char-item'>
                        <h2 className='char-item__name'> {name}</h2>
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
                        <div className='char-item__blocks'>
                            <div className='char-item__label'>
                                Gender:<br />
                                <span>{gender}</span>
                            </div>
                            <div className='char-item__label'>
                                Location:<br />
                                <span>{locationName}</span>
                            </div>

                            <div className='char-item__label'>
                                Episodes:<br />
                                <span>{episode}</span>
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
                <ul className='char__grid'>
                    {items}
                </ul>
            </>
        )
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded, term } = this.state;
        const items = this.renderItems(this.searchItem(charList, term));

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null
        const content = !(loading, errorMessage) ? items : null;
        return (
            <div className='char__list'>
                <SearchPanel onUpdateSearch={this.onUpdateSearch} />

                {errorMessage}
                {spinner}
                {content}

                <button
                    className='char__bnt button'
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}>load more</button>
            </div>
        )
    }
}

export default CharList