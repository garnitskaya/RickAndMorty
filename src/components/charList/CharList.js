import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import RickAndMortyService from './../../services/RickAndMortyService';
import Spinner from './../spinner/Spinner';
import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1,
        charEnded: false
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

    renderItems = (arr) => {
        const items = arr.map(({ id, name, image, status, locationUrl, locationName, episode, species, url }) => {

            const red = status === "Dead" ? 'red' : null;
            const green = status === "Alive" ? 'green' : null;
            const grey = status === "unknown" ? 'grey' : null;

            return (
                <li className='char__card' key={id} >
                    <div className='char__img'>
                        <img src={image} alt={name} />
                    </div>
                    <div className='char__block char-item'>
                        <div className='char-item__block'>
                            <a className='char-item__name' href={url}>
                                <h2>{name}</h2>
                            </a>
                            <span className='char-item__status'>
                                <i className={`fas fa-circle ${red} ${grey} ${green}`}></i>
                                {status} - {species}
                            </span>
                        </div>
                        <div className='char-item__block'>
                            <div className='char-item__label'>Last known location:</div>
                            <a href={locationUrl}>{locationName}</a>
                        </div>
                        <div className='char-item__block'>
                            <div className='char-item__label'>First seen in:</div>
                            <a href={episode}>{episode}</a>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <ul className='char__grid'>
                {items}
            </ul>
        )
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null
        const content = !(loading, errorMessage) ? items : null;
        return (
            <div className='char__list'>
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