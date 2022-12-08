import { Link } from "react-router-dom";
import { CharType } from "../types/character";
import { getElements } from "../utils/getElemetns";
import { IEpisode } from "./../types/episodes";
import { ILocation } from "./../types/locations";

const rickAndMortyService = () => {
  const _apiBase = "https://rickandmortyapi.com/api";
  const _baseOffset = 1;

  const getResource = async (url: string) => {
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

  const getCharacter = async (id: number) => {
    const res = await getResource(`${_apiBase}/character/${id}`);
    return _transformCharacter(res);
  };

  const getAllEpisode = async (offset = _baseOffset) => {
    const res = await getResource(`${_apiBase}/episode/?page=${offset}`);
    return res.results.map(_transformEpisode);
  };

  const getEpisode = async (id: number) => {
    const res = await getResource(`${_apiBase}/episode/${id}`);
    return _transformEpisode(res);
  };

  const getAllLocation = async (offset = _baseOffset) => {
    const res = await getResource(`${_apiBase}/location/?page=${offset}`);
    return res.results.map(_transformLocation);
  };

  const getLocation = async (id: number) => {
    const res = await getResource(`${_apiBase}/location/${id}`);
    return _transformLocation(res);
  };

  const _transformCharacter = (char: IChar): CharType => {
    const regexp: RegExp | null = /\/([0-9]*)$/;
    const episode = char.episode[0]?.match(regexp);

    const episodes = char.episode?.map((item, i) => {
      let id = item.match(regexp);
      return (
        <Link key={i} to={`/episodes/${id?.[1]}`}>
          Episodes № {id}
        </Link>
      );
    });

    return {
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      image: char.image,
      locationName: char.location.name,
      locationUrl: char.location.url.slice(41),
      episode: char.episode && episode ? episode[1] : "",
      episodes,
      gender: char.gender,
    };
  };

  const _transformEpisode = (episode: IEpisodes): IEpisode => {
    return {
      id: episode.id,
      name: episode.name,
      airDate: episode.air_date,
      characters: getElements(episode.characters),
      url: episode.url,
    };
  };

  const _transformLocation = (location: ILocations): ILocation => {
    return {
      id: location.id,
      name: location.name,
      type: location.type,
      dimension: location.dimension,
      residents: getElements(location.residents),
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

interface IChar {
  id: number;
  status: string;
  name: string;
  species: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  gender: string;
  episode: string[];
}

interface IEpisodes {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

interface ILocations {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
}
