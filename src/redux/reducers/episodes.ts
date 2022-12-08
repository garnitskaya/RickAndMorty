import { Actions, ActionTypes, IEpisodesState } from '../../types/episodes';

const initialState: IEpisodesState = {
    episodes: [],
    loading: true,
    error: false,
    newItemLoading: false,
    ended: false,
    offset: 1,
}

export default (state = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.EPISODES_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.EPISODES_FETCHED: {
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
        case ActionTypes.EPISODES_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        case ActionTypes.NEW_EPISODES_FETCHING:
            return {
                ...state,
                newItemLoading: true
            };
        default:
            return state;
    }
}