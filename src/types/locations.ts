export type ILocation = {
  id: number,
  name: string,
  type: string,
  dimension: string,
  residents: JSX.Element,
  url: string,
}

export interface ILocationsState {
  locations: ILocation[],
  loading: boolean,
  error: boolean,
  newItemLoading: boolean,
  ended: boolean,
  offset: number,
}

export enum ActionTypes {
  LOCATIONS_FETCHING = 'LOCATIONS_FETCHING',
  LOCATIONS_FETCHED = 'LOCATIONS_FETCHED',
  LOCATIONS_FETCHING_ERROR = 'LOCATIONS_FETCHING_ERROR',
  NEW_LOCATIONS_FETCHING = 'NEW_LOCATIONS_FETCHING',
}

interface LocationsFetching {
  type: ActionTypes.LOCATIONS_FETCHING
}
interface LocationsFetched {
  type: ActionTypes.LOCATIONS_FETCHED,
  payload: ILocation[]
}
interface LocationsFetchingError {
  type: ActionTypes.LOCATIONS_FETCHING_ERROR
}
interface NewlocationsFetching {
  type: ActionTypes.NEW_LOCATIONS_FETCHING
}

export type Actions =
  LocationsFetching
  | LocationsFetched
  | LocationsFetchingError
  | NewlocationsFetching