import { combineReducers } from 'redux';

import characters from './characters';
import character from './character';
import episodes from './episodes';
import locations from './locations';

const allReducers = combineReducers({
    characters,
    character,
    episodes,
    locations,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        state = undefined;
    }

    return allReducers(state, action);
}

export default rootReducer;
