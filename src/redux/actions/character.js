import rickAndMortyService from '../../services/rickAndMortyService';

export const Types = {
    CHAR_CHAR_FETCHING: 'CHAR_FETCHING',
    CHAR_CHAR_FETCHED: 'CHAR_FETCHED',
    CHAR_CHAR_FETCHING_ERROR: 'CHAR_FETCHING_ERROR',
}

const { getCharacter } = rickAndMortyService();

export const dataFetching = () => ({ type: Types.CHAR_CHAR_FETCHING });
export const dataFetched = (payload) => ({ type: Types.CHAR_CHAR_FETCHED, payload });
export const dataFetchingError = () => ({ type: Types.CHAR_CHAR_FETCHING_ERROR });

export const fetchCharacter = (id) => (dispatch) => {
    dispatch(dataFetching());
    getCharacter(id)
        .then((data) => dispatch(dataFetched(data)))
        .catch(() => dispatch(dataFetchingError()))
}