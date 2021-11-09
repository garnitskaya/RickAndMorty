import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';

import './randomChar.scss';
import { Link } from 'react-router-dom';

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
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className='randomchar'>

                {spinner}
                {errorMessage}
                {content}


                <button
                    className='button button__random'
                    onClick={this.updateChar}>
                    try it
                </button>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { id, name, image } = char;
    return (
        <div className='randomchar__card'>
            <img src={image} alt={name} />
            <Link to={`/${id}`} className='randomchar__name' >
                <h2>{name}</h2>
            </Link>
        </div >
    )
}
export default RandomChar;