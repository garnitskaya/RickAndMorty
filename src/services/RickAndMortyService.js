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

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/character/?page=${offset}`);
        return res.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/character/${id}`);
        return this._transformCharacter(res);
    }

    //getAllCharactersSpecies = async (offset, species = '') => {
    //    const res = await this.getResource(`${this._apiBase}/character/?page=${offset}&species=${species}`);
    //    return res.results.map(this._transformCharacter);
    //}

    getAllEpisode = async () => {
        const res = await this.getResource(`${this._apiBase}/episode`);
        return res.results.map(this._transformEpisode);
    }

    getAllLocation = async () => {
        const res = await this.getResource(`${this._apiBase}/location`);
        return res.results.map(this._transformLocation);
    }

    _extractName = () => {

    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            url: char.url,
            name: char.name,
            status: char.status,
            species: char.species,
            image: char.image,
            locationName: char.location.name,
            charEpisode: char.episode,
            gender: char.gender
        }
    }

    _transformEpisode = (episode) => {
        return {
            id: episode.id,
            name: episode.name,
            characters: episode.characters,
            url: episode.url
        }
    }

    _transformLocation = (location) => {
        return {
            id: location.id,
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            residents: location.residents,
            url: location.url
        }
    }
}

