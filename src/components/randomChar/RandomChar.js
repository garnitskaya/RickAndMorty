import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';

import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.updateChar();
        this.timeId = setInterval(this.updateChar, 100000);
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (670 - 1) + 1);

        this.onCharLoading();

        this.rickAndMortyService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { char, loading, error } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(spinner, errorMessage) ? <View char={char} /> : null;

        return (
            <div className='randomchar'>

                {spinner}
                {errorMessage}
                {content}


                <button
                    className='button randomchar__btn'
                    onClick={this.updateChar}>
                    try it
                </button>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, image, url } = char;
    return (
        <div className='randomchar__card'>
            <img src={image} alt={name} />
            <a className='randomchar__name' href={url}>
                <h2>{name}</h2>
            </a>
        </div >
    )
}
export default RandomChar;