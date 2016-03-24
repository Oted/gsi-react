import { combineReducers } from 'redux';
import gsi from './gsi';

const rootReducer = combineReducers({
    gsi : gsi
});

export default rootReducer;
