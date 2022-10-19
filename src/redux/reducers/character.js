import { Types } from './../actions/character';

const initialState = {
    char: {},
    loading: true,
    error: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.CHAR_CHAR_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case Types.CHAR_CHAR_FETCHED: {
            return {
                ...state,
                char: action.payload,
                loading: false
            }
        };
        case Types.CHAR_CHAR_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            return state;
    }
}