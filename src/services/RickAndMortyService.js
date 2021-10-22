export default class RickAndMortyService {
    _apiBase = 'https://rickandmortyapi.com/api';

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/character`);
        return res.results.map(this._transformCharacter);
    }

    getAllEpisode = async () => {
        const res = await this.getResource(`${this._apiBase}/episode`);
        return res.results;
    }

    getAllLocation = async () => {
        const res = await this.getResource(`${this._apiBase}/location`);
        return res.results;
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            image: char.image,
            location: char.location,
            episode: char.episode,
        }
    }

}

