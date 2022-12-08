import { applyMiddleware, compose, createStore, Action } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { CombinedState, combineReducers } from 'redux';
import { characters, character, episodes, locations } from './reducers';
import { IDataState } from '../types/character';
import { ICharactersState } from '../types/characters';
import { IEpisodesState } from '../types/episodes';
import { ILocationsState } from '../types/locations';

type RootReducerType = CombinedState<{
  characters: ICharactersState;
  character: IDataState;
  episodes: IEpisodesState;
  locations: ILocationsState;
}> | undefined;

const allReducers = combineReducers({
  characters,
  character,
  episodes,
  locations,
});

const rootReducer = (state: RootReducerType, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return allReducers(state, action);
}

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;



