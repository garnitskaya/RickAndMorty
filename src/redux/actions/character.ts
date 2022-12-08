import { Dispatch } from 'react';
import rickAndMortyService from '../../services/rickAndMortyService';
import { Actions, ActionTypes } from '../../types/character';

const { getCharacter, getEpisode, getLocation } = rickAndMortyService();

type ApiMethod = typeof getCharacter | typeof getEpisode | typeof getLocation;

const _fetchItem = async (dispatch: Dispatch<Actions>, id: number, apiMethod: ApiMethod) => {
  try {
    dispatch({ type: ActionTypes.DATA_FETCHING });
    let response = await apiMethod(id);
    return dispatch({ type: ActionTypes.DATA_FETCHED, payload: response });

  } catch (error) {
    dispatch({ type: ActionTypes.DATA_FETCHING_ERROR });
  }
}

export const fetchCharacter = (id: number) => async (dispatch: Dispatch<Actions>) => {
  await _fetchItem(dispatch, id, getCharacter);
}

export const fetchLocation = (id: number) => async (dispatch: Dispatch<Actions>) => {
  await _fetchItem(dispatch, id, getLocation);
}
export const fetchEpisode = (id: number) => async (dispatch: Dispatch<Actions>) => {
  await _fetchItem(dispatch, id, getEpisode);
}