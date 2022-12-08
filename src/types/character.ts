import { ILocation } from './locations';
import { IEpisode } from './episodes';

export type CharType = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  locationName: string,
  locationUrl: string,
  episode: string,
  episodes: JSX.Element[],
  gender: string,
};

export type DataType = CharType | ILocation | IEpisode;

export interface IDataState {
  data: DataType,
  loading: boolean;
  error: boolean;
}

export enum ActionTypes {
  DATA_FETCHING = 'DATA_FETCHING',
  DATA_FETCHED = 'DATA_FETCHED',
  DATA_FETCHING_ERROR = 'DATA_FETCHING_ERROR',
}

interface DataFetching {
  type: ActionTypes.DATA_FETCHING
}
interface DataFetched {
  type: ActionTypes.DATA_FETCHED,
  payload: DataType
}
interface DataFethingError {
  type: ActionTypes.DATA_FETCHING_ERROR
}

export type Actions =
  DataFetching
  | DataFetched
  | DataFethingError