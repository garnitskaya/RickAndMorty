import { Types } from './../actions/episodes';

const initialState = {
    episodes: [],
    loading: true,
    error: false,
    newItemLoading: false,
    ended: false,
    offset: 1,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.EPISODES_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case Types.EPISODES_FETCHED: {
            let ended = false;
            if (action.payload.length < 20) {
                ended = true;
            }
            return {
                ...state,
                episodes: [...state.episodes, ...action.payload],
                loading: false,
                newItemLoading: false,
                ended: ended,
                offset: state.offset + 1
            }
        };
        case Types.EPISODES_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        case Types.NEW_EPISODES_FETCHING:
            return {
                ...state,
                newItemLoading: true
            };
        default:
            return state;
    }
}