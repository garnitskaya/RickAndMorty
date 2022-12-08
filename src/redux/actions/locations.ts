import { Dispatch } from 'react';
import rickAndMortyService from '../../services/rickAndMortyService';
import { Actions, ActionTypes, ILocation } from '../../types/locations';

const { getAllLocation } = rickAndMortyService();

export const fetchLocations = (offset: number) => (dispatch: Dispatch<Actions>) => {
  dispatch({ type: ActionTypes.NEW_LOCATIONS_FETCHING });
  getAllLocation(offset)
    .then((data: ILocation[]) => dispatch({ type: ActionTypes.LOCATIONS_FETCHED, payload: data }))
    .catch(() => dispatch({ type: ActionTypes.LOCATIONS_FETCHING_ERROR }))
}