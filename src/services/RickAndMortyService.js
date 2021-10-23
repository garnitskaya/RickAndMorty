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

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/character/${id}`);
        return this._transformCharacter(res);
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
            url: char.url,
            name: char.name,
            status: char.status,
            species: char.species,
            image: char.image,
            locationUrl: char.location.url,
            locationName: char.location.name,
            episode: char.episode[0],
        }
    }

}

