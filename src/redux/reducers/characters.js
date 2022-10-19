import { Types } from './../actions/characters';

const initialState = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    charEnded: true,
    offset: 1,
    filter: '',
    filteredItems: [],
    term: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.CHARACTERS_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case Types.CHARACTERS_FETCHED: {
            let ended = false;
            if (action.payload.length < 20) {
                ended = true;
            }
            return {
                ...state,
                charList: [...state.charList, ...action.payload],
                filteredItems: [...state.charList, ...action.payload],
                loading: false,
                newItemLoading: false,
                charEnded: ended,
                offset: state.offset + 1
            }
        };
        case Types.CHARACTERS_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        case Types.NEW_CHARACTERS_FETCHING:
            return {
                ...state,
                newItemLoading: true
            };
        case Types.SET_TERM:
            return {
                ...state,
                term: action.payload
            };
        case Types.FILTER_CHANGED:
            return {
                ...state,
                charList: '',
                offset: 1,
                filter: action.payload,
                filteredItems: action.payload === '' ?
                    state.charList :
                    state.charList.filter(item => item.species === action.payload)
            };
        default:
            return state;
    }
}