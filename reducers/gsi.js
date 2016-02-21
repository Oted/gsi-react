import {
    INIT,
    TOGGLE_SEARCH_TYPE
} from '../constants/ActionTypes';

import utils from '../utils/Utils'

import initial from './initial.json';

export default function gsi(state = initial, action) {
    switch (action.type) {

        case TOGGLE_SEARCH_TYPE:
            return {
                ...state,
                ...state['search'][action.list].map(target => {
                    if (action.item === target.type) {
                        target.active = !target.active;
                    }

                    return target;
                })
            }

        default:
            return state;
    }
}
