import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import RickAndMortyService from './../../services/RickAndMortyService';
import Spinner from './../spinner/Spinner';
import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = () => {
        this.rickAndMortyService
            .getAllCharacters()
            .then(this.onCharListLoading)
            .catch(this.onError)
    }

    onCharListLoading = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems = (arr) => {
        return arr.map(({ id, name, image, status, location, episode, species }) => {
            return (
                <li className='char__card' key={id} >
                    <img src={image} alt={name} />
                    <div className='char__block char-item'>
                        <div className='char-item__block'>
                            <a className='char-item__name' href='s#'>
                                <h2>{name}</h2>
                            </a>
                            <span className='char-item__status'>{status} - {species}</span>
                        </div>
                        <div className='char-item__block'>
                            <div className='char-item__label'>Last known location:</div>
                            <a href={location.url}>{location.name}</a>
                        </div>
                        <div className='char-item__block'>
                            <div className='char-item__label'>First seen in:</div>
                            <a href='s#'>{episode[0]}</a>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        const { charList, loading, error } = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null
        const content = !(loading, errorMessage) ? items : null;
        return (
            <div className='char__list'>
                <ul className='char__grid'>
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className='char__bnt'>load more</button>
            </div>
        )
    }
}

export default CharList