import { Link } from "react-router-dom";

const rickAndMortyService = () => {
    const _apiBase = "https://rickandmortyapi.com/api";
    const _baseOffset = 1;

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }
        return await res.json();
    };

    const getAllCharacters = async (offset = _baseOffset, species = "") => {
        const res = await getResource(
            `${_apiBase}/character/?page=${offset}&species=${species}`
        );
        return res.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await getResource(`${_apiBase}/character/${id}`);
        return _transformCharacter(res);
    };

    const getAllEpisode = async (offset = _baseOffset) => {
        const res = await getResource(`${_apiBase}/episode/?page=${offset}`);
        return res.results.map(_transformEpisode);
    };

    const getEpisode = async (id) => {
        const res = await getResource(`${_apiBase}/episode/${id}`);
        return _transformEpisode(res);
    };

    const getAllLocation = async (offset = _baseOffset) => {
        const res = await getResource(`${_apiBase}/location/?page=${offset}`);
        return res.results.map(_transformLocation);
    };

    const getLocation = async (id) => {
        const res = await getResource(`${_apiBase}/location/${id}`);
        return _transformLocation(res);
    };

    const elements = (element, children) => {
        return element.map((item) => {
            let id = item.match(/\/([0-9]*)$/)[1];
            return (
                <Link to={`/characters/${id}`} key={id}>
                    {children}
                    <img
                        src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}
                        alt="character"
                    />
                </Link>
            );
        });
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            image: char.image,
            locationName: char.location.name,
            locationUrl: char.location.url.slice(41),
            episode: char.episode[0].match(/\/([0-9]*)$/)[1],
            episodes: char.episode.map((item) => {
                let id = item.match(/\/([0-9]*)$/)[1];
                return (
                    <Link key={id} to={`/episodes/${id}`}>
                        Episodes № {id}
                    </Link>
                );
            }),
            gender: char.gender,
        };
    };

    const _transformEpisode = (episode) => {
        return {
            id: episode.id,
            name: episode.name,
            airDate: episode.air_date,
            characters: elements(episode.characters),
            url: episode.url,
        };
    };

    const _transformLocation = (location) => {
        return {
            id: location.id,
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            residents: elements(location.residents),
            url: location.url,
        };
    };

    return {
        getAllCharacters,
        getCharacter,
        getAllEpisode,
        getEpisode,
        getAllLocation,
        getLocation,
    };
};

export default rickAndMortyService;