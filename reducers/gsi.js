import { INIT } from '../constants/ActionTypes';
import initial from './initial.json';

export default function todos(state = initial, action) {
    switch (action.type) {

    case INIT :
        return state;

    // case MARK_ALL:
        // const areAllMarked = state.every(todo => todo.marked);
        // return state.map(todo => ({
            // ...todo,
            // marked: !areAllMarked
        // }));

    default:
        return state;
    }
}
