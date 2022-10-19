import rickAndMortyService from '../../services/rickAndMortyService';

export const Types = {
    CHARACTERS_FETCHING: 'CHARACTERS_FETCHING',
    CHARACTERS_FETCHED: 'CHARACTERS_FETCHED',
    CHARACTERS_FETCHING_ERROR: 'CHARACTERS_FETCHING_ERROR',
    NEW_CHARACTERS_FETCHING: 'NEW_CHARACTERS_FETCHING',
    SET_TERM: 'SET_TERM',
    FILTER_CHANGED: 'FILTER_CHANGED',
}

const { getAllCharacters } = rickAndMortyService();

export const dataFetching = () => ({ type: Types.CHARACTERS_FETCHING });
export const dataFetched = (charList) => ({ type: Types.CHARACTERS_FETCHED, payload: charList });
export const dataFetchingError = () => ({ type: Types.CHARACTERS_FETCHING_ERROR });
export const newDataFetching = () => ({ type: Types.NEW_CHARACTERS_FETCHING });
export const setTerm = (term) => ({ type: Types.SET_TERM, payload: term });
export const setFilter = (filter) => ({ type: Types.FILTER_CHANGED, payload: filter });

export const fetchCharList = (offset, filter) => (dispatch) => {
    dispatch(newDataFetching());
    getAllCharacters(offset, filter)
        .then((data) => dispatch(dataFetched(data)))
        .catch(() => dispatch(dataFetchingError()))
}