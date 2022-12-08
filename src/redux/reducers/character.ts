import { Actions, ActionTypes, DataType, IDataState } from '../../types/character';

const initialState: IDataState = {
    data: {} as DataType,
    loading: true,
    error: false
}

export default (state = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.DATA_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.DATA_FETCHED: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        };
        case ActionTypes.DATA_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            return state;
    }
}