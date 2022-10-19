
import { Types } from './../actions/locations';

const initialState = {
    locations: [],
    loading: true,
    error: false,
    newItemLoading: false,
    ended: false,
    offset: 1,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.LOCATIONS_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case Types.LOCATIONS_FETCHED: {
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
        case Types.LOCATIONS_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        case Types.NEW_LOCATIONS_FETCHING:
            return {
                ...state,
                newItemLoading: true
            };
        default:
            return state;
    }
}