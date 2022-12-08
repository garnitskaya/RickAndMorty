import { Actions, ActionTypes, ICharactersState } from '../../types/characters';

const initialState: ICharactersState = {
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

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.CHARACTERS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CHARACTERS_FETCHED: {
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
    case ActionTypes.CHARACTERS_FETCHING_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      };
    case ActionTypes.NEW_CHARACTERS_FETCHING:
      return {
        ...state,
        newItemLoading: true
      };
    case ActionTypes.SET_TERM:
      return {
        ...state,
        term: action.payload
      };
    case ActionTypes.FILTER_CHANGED:
      return {
        ...state,
        charList: [],
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