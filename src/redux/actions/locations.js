import rickAndMortyService from '../../services/rickAndMortyService';

const { getAllLocation } = rickAndMortyService();

export const Types = {
    LOCATIONS_FETCHING: 'LOCATIONS_FETCHING',
    LOCATIONS_FETCHED: 'LOCATIONS_FETCHED',
    LOCATIONS_FETCHING_ERROR: 'LOCATIONS_FETCHING_ERROR',
    NEW_LOCATIONS_FETCHING: 'NEW_LOCATIONS_FETCHING',
}

export const dataFetching = () => ({ type: Types.LOCATIONS_FETCHING });
export const dataFetched = (locations) => ({ type: Types.LOCATIONS_FETCHED, payload: locations });
export const dataFetchingError = () => ({ type: Types.LOCATIONS_FETCHING_ERROR });
export const newDataFetching = () => ({ type: Types.NEW_LOCATIONS_FETCHING });

export const fetchLocations = (offset) => (dispatch) => {
    dispatch(newDataFetching());
    getAllLocation(offset)
        .then((data) => dispatch(dataFetched(data)))
        .catch(() => dispatch(dataFetchingError()))
}