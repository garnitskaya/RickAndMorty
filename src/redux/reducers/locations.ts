import { Actions, ActionTypes, ILocationsState } from '../../types/locations';

const initialState: ILocationsState = {
    locations: [],
    loading: true,
    error: false,
    newItemLoading: false,
    ended: false,
    offset: 1,
}

export default (state = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.LOCATIONS_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.LOCATIONS_FETCHED: {
            let ended = false;
            if (action.payload.length < 20) {
                ended = true;
            }
            return {
                ...state,
                locations: [...state.locations, ...action.payload],
                loading: false,
                newItemLoading: false,
                ended: ended,
                offset: state.offset + 1
            }
        };
        case ActionTypes.LOCATIONS_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        case ActionTypes.NEW_LOCATIONS_FETCHING:
            return {
                ...state,
                newItemLoading: true
            };
        default:
            return state;
    }
}