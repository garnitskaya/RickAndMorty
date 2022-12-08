import { CharType } from './character';

export type FilterItems =
  '' | 'Human' | 'Alien' | 'Humanoid' |
  'Robot' | 'Animal' | 'Mythological Creature' |
  'Poopybutthole' | 'Cronenberg' | 'Unknown';


export interface ICharactersState {
  charList: CharType[],
  loading: boolean,
  error: boolean,
  newItemLoading: boolean,
  charEnded: boolean,
  offset: number,
  filter: string,
  filteredItems: CharType[],
  term: string
}

export enum ActionTypes {
  CHARACTERS_FETCHING = 'CHARACTERS_FETCHING',
  CHARACTERS_FETCHED = 'CHARACTERS_FETCHED',
  CHARACTERS_FETCHING_ERROR = 'CHARACTERS_FETCHING_ERROR',
  NEW_CHARACTERS_FETCHING = 'NEW_CHARACTERS_FETCHING',
  SET_TERM = 'SET_TERM',
  FILTER_CHANGED = 'FILTER_CHANGED',
}

interface CharactersFetching {
  type: ActionTypes.CHARACTERS_FETCHING
}
interface CharactersFetched {
  type: ActionTypes.CHARACTERS_FETCHED,
  payload: CharType[]
}
interface CharactersFethingError {
  type: ActionTypes.CHARACTERS_FETCHING_ERROR
}
interface NewCharactersFething {
  type: ActionTypes.NEW_CHARACTERS_FETCHING
}
interface SetTerm {
  type: ActionTypes.SET_TERM
  payload: string
}
interface FilterChanged {
  type: ActionTypes.FILTER_CHANGED
  payload: FilterItems
}
export type Actions =
  CharactersFetching
  | CharactersFetched
  | CharactersFethingError
  | NewCharactersFething
  | SetTerm
  | FilterChanged