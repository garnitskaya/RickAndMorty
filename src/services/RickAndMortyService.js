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
            locationName: char.location.name,
            episode: char.episode[0],
            gender: char.gender
        }
    }

}

