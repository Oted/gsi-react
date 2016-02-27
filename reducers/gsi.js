import * as actions from '../constants/ActionTypes';
import * as utils from '../utils/Utils';
import initial from './initial.json';
import _ from 'lodash';


export default function gsi(state = initial, action) {
    switch (action.type) {

        case actions.SET_SEARCH_TEXT:
            return _.merge({}, state, {'search' : {'for' : action.text}});

        case actions.TOGGLE_SEARCH_TYPE:
            var newObj = {'search' : {}};
            newObj.search[action.list] = state['search'][action.list].map(target => {
                if (action.item === target.type) {
                    target.active = !target.active;
                }

                return target;
            });

            return _.merge({}, state, newObj);

        case actions.SET_ACTIVE_QUERY:
            return _.merge({}, state, {'queries' : [action.query, ...state['queries']]});

        case actions.GOT_ITEMS:
            var newObj = {'lists' : {}};
            newObj['lists'][action.res.body.query._id] = {};
            newObj['lists'][action.res.body.query._id]['query'] = action.res.body.query;
            newObj['lists'][action.res.body.query._id]['items'] = [
                ...state.lists[action.res.body.query._id] ? state.lists[action.res.body.query._id]['items'] : [],
                ...action.res.body.items
            ];

            return _.merge({}, state, newObj);

        default:
            return state;
    }
}
