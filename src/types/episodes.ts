export type IEpisode = {
  id: number,
  name: string,
  airDate: string,
  characters: JSX.Element,
  url: string,
}

export interface IEpisodesState {
  episodes: IEpisode[],
  loading: boolean,
  error: boolean,
  newItemLoading: boolean,
  ended: boolean,
  offset: number,
}

export enum ActionTypes {
  EPISODES_FETCHING = 'EPISODES_FETCHING',
  EPISODES_FETCHED = 'EPISODES_FETCHED',
  EPISODES_FETCHING_ERROR = 'EPISODES_FETCHING_ERROR',
  NEW_EPISODES_FETCHING = 'NEW_EPISODES_FETCHING',
}

interface EpisodesFetching {
  type: ActionTypes.EPISODES_FETCHING
}
interface EpisodesFetched {
  type: ActionTypes.EPISODES_FETCHED,
  payload: IEpisode[]
}
interface EpisodesFetchingError {
  type: ActionTypes.EPISODES_FETCHING_ERROR
}
interface NewEpisodesFetching {
  type: ActionTypes.NEW_EPISODES_FETCHING
}

export type Actions =
  EpisodesFetching
  | EpisodesFetched
  | EpisodesFetchingError
  | NewEpisodesFetching