import { Dispatch } from 'react';
import rickAndMortyService from '../../services/rickAndMortyService';
import { Actions, ActionTypes, IEpisode } from '../../types/episodes';

const { getAllEpisode } = rickAndMortyService();

export const fetchEpisodes = (offset: number) => (dispatch: Dispatch<Actions>) => {
  dispatch({ type: ActionTypes.NEW_EPISODES_FETCHING });
  getAllEpisode(offset)
    .then((data: IEpisode[]) => dispatch({ type: ActionTypes.EPISODES_FETCHED, payload: data }))
    .catch(() => dispatch({ type: ActionTypes.EPISODES_FETCHING_ERROR }))
}