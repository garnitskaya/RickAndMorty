import rickAndMortyService from '../../services/rickAndMortyService';

export const Types = {
    EPISODES_FETCHING: 'EPISODES_FETCHING',
    EPISODES_FETCHED: 'EPISODES_FETCHED',
    EPISODES_FETCHING_ERROR: 'EPISODES_FETCHING_ERROR',
    NEW_EPISODES_FETCHING: 'NEW_EPISODES_FETCHING',
}

const { getAllEpisode } = rickAndMortyService();

export const dataFetching = () => ({ type: Types.EPISODES_FETCHING });
export const dataFetched = (episodes) => ({ type: Types.EPISODES_FETCHED, payload: episodes });
export const dataFetchingError = () => ({ type: Types.EPISODES_FETCHING_ERROR });
export const newDataFetching = () => ({ type: Types.NEW_EPISODES_FETCHING });

export const fetchEpisodes = (offset) => (dispatch) => {
    dispatch(newDataFetching());
    getAllEpisode(offset)
        .then((data) => dispatch(dataFetched(data)))
        .catch(() => dispatch(dataFetchingError()))
}