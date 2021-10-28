import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import RickAndMortyService from './../../services/RickAndMortyService';

import './locations.scss';

class Location extends Component {
    state = {
        locations: [],
        loading: true,
        error: false
    }

    rickandmortyapi = new RickAndMortyService();

    componentDidMount() {
        this.rickandmortyapi
            .getAllLocation()
            .then(this.onLocationLoaded)
            .catch(this.onError)
    }

    onLocationLoaded = (locations) => {
        this.setState({
            locations,
            loading: false
        })
    }


    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItem = (arr) => {
        return arr.map(({ id, name, type, dimension, residents }) => {

            const resident = residents.map(item => {
                const idRegExp = /\/([0-9]*)$/;
                const idChar = item.match(idRegExp)[1];

                return (
                    <a href={item}
                        key={idChar}>
                        <img
                            src={`https://rickandmortyapi.com/api/character/avatar/${idChar}.jpeg`}
                            alt="character" />
                    </a>
                )
            })

            return (
                <div className='locations__items'
                    key={id}>
                    <div className='locations__item'>
                        name: <br />
                        <span>{name}</span>
                    </div>
                    <div className='locations__item'>
                        type: <br />
                        <span> {type}</span>
                    </div>
                    <div className='locations__item'>
                        dimension: <br />
                        <span>{dimension}</span>
                    </div>
                    <div className='locations__item'>
                        residents: <br />
                        <div
                            className='locations__img'>
                            {resident}
                        </div>
                    </div>
                </div>)
        })
    }


    render() {
        const { locations, loading, error } = this.state;
        const location = this.renderItem(locations);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(spinner, errorMessage) ? location : null;

        return (
            <div className='locations'>
                <h2 className='locations__title'>Locations</h2>
                <div className='locations__list'>

                    {spinner}
                    {errorMessage}
                    {content}

                </div>
                <button
                    className='button button__load'
                //disabled={newItemLoading}
                //style={{ 'display': charEnded ? 'none' : 'block' }}
                //onClick={() => this.onRequest(offset)}
                >
                    load more
                </button>
            </div>

        )
    }
}

export default Location;