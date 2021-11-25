import { Link } from 'react-router-dom';

export default class RickAndMortyService {
    _apiBase = 'https://rickandmortyapi.com/api';
    _baseOffset = 1;

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }
        return await res.json();
    }

    //getAllPages = async () => {
    //    const res = await this.getResource(`${this._apiBase}/character`);
    //    return res.info.pages;
    //}

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/character/?page=${offset}`);
        return res.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/character/${id}`);
        return this._transformCharacter(res);
    }

    getAllEpisode = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/episode/?page=${offset}`);
        return res.results.map(this._transformEpisode);
    }

    getEpisode = async (id) => {
        const res = await this.getResource(`${this._apiBase}/episode/${id}`);
        return this._transformEpisode(res);
    }


    getAllLocation = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/location/?page=${offset}`);
        return res.results.map(this._transformLocation);
    }

    getLocation = async (id) => {
        const res = await this.getResource(`${this._apiBase}/location/${id}`);
        return this._transformLocation(res);
    }

    elements = (element, children) => {
        return element.map(item => {
            let id = item.match(/\/([0-9]*)$/)[1];
            return (
                <Link to={`/characters/${id}`} key={id}>
                    {children}
                    <img
                        src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}
                        alt="character" />
                </Link>)
        })
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            image: char.image,
            locationName: char.location.name,
            locationUrl: char.location.url.slice(41),
            episode: char.episode[0].match(/\/([0-9]*)$/)[1],
            episodes: char.episode.map(item => {
                let id = item.match(/\/([0-9]*)$/)[1];
                return (
                    <Link key={id} to={`/episodes/${id}`}>
                        Episodes № {id}
                    </Link>
                )
            }),
            gender: char.gender
        }
    }

    _transformEpisode = (episode) => {
        return {
            id: episode.id,
            name: episode.name,
            airDate: episode.air_date,
            characters: this.elements(episode.characters),
            url: episode.url
        }
    }

    _transformLocation = (location) => {
        return {
            id: location.id,
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            residents: this.elements(location.residents),
            url: location.url
        }
    }
}

