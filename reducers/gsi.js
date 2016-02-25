import * as actions from '../constants/ActionTypes';
import * as utils from '../utils/Utils';
import initial from './initial.json';
import _ from 'lodash';


export default function gsi(state = initial, action) {
    console.log('here');
    switch (action.type) {

        case actions.SET_SEARCH_TEXT:
            return {
                ...state,
                ...state['search'].for = action.text
            }

        case actions.TOGGLE_SEARCH_TYPE:
            return {
                ...state,
                ...state['search'][action.list].map(target => {
                    if (action.item === target.type) {
                        target.active = !target.active;
                    }

                    return target;
                })
            }

        case actions.SEARCH:
            return {
                ...state,
                ...state['search'].isLoading = true
            }

        case actions.GOT_ITEMS:
            const key = 'test';
            console.log(state);
            const current = state.items[key] || [];
            const newObj = {'items' : {}};
            newObj['items'][key] = [...current, ...action.res.body];

            return _.assign(state, newObj);

        default:
            return state;
    }
}
