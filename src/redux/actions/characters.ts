import { Dispatch } from 'react';
import rickAndMortyService from '../../services/rickAndMortyService';
import { CharType } from '../../types/character';
import { Actions, ActionTypes, FilterItems } from '../../types/characters';

const { getAllCharacters } = rickAndMortyService();

export const newDataFetching = () => ({ type: ActionTypes.NEW_CHARACTERS_FETCHING });
export const setTerm = (term: string) => ({ type: ActionTypes.SET_TERM, payload: term });
export const setFilter = (filter: FilterItems) => ({ type: ActionTypes.FILTER_CHANGED, payload: filter });

export const fetchCharList = (offset: number, filter: FilterItems) => (dispatch: Dispatch<Actions>) => {
  dispatch({ type: ActionTypes.CHARACTERS_FETCHING });
  getAllCharacters(offset, filter)
    .then((data: CharType[]) => dispatch({ type: ActionTypes.CHARACTERS_FETCHED, payload: data }))
    .catch(() => dispatch({ type: ActionTypes.CHARACTERS_FETCHING_ERROR }))
}