import * as actions from '../constants/ActionTypes';
import * as utils from '../utils/Utils';
import initial from './initial.json';
import _ from 'lodash';

export default function gsi(state = initial, action) {
    switch (action.type) {

        case actions.SCROLL_TO_POSITION:
            window.scrollTo(0,0);
            return state;

        case actions.SCROLL_TO_INDEX:
            window.scrollTo(0,0);
            return state;

        case actions.SET_CURRENT_INDEX:
            var newObj = {'lists' : {}};
            newObj['lists'][action.queryId] = {
                'currentIndex' : action.index
            };

            return _.merge({}, state, newObj);

        case actions.LOADING_ITEMS:
            return _.merge({}, state, {'search' : {'isLoading' : action.isLoading}});

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
            let index = -1;
            let exist = state.queries.filter(function(q, i) {
                if (action.query._hash === q._hash) {
                    index = i;
                }

                return action.query._hash === q._hash;
            });

            if (index > -1) {
                return _.merge({}, state, {'queries' : state.queries.splice(0,0,state.queries.splice(index, 1)[0])})
            }

            return _.merge({}, state, {'queries' : [action.query, ...state['queries']]});

        case actions.GOT_ITEMS:
            var newObj = {'lists' : {}, 'search' : {'isLoading' : false}};
            newObj['lists'][action.res.body.query._hash] = {};
            newObj['lists'][action.res.body.query._hash]['query'] = action.res.body.query;
            newObj['lists'][action.res.body.query._hash]['items'] = [
                ...state.lists[action.res.body.query._hash] ? state.lists[action.res.body.query._hash]['items'] : [],
                ...action.res.body.items
            ];

            newObj.lists[action.res.body.query._hash].items = utils.filterDuplicates(newObj.lists[action.res.body.query._hash].items);

            return _.merge({}, state, newObj);

        case actions.GOT_FRAGMENTS:
            let newObj = {
                'fragments' : action.fragments
            }

            return _.merge({}, state, newObj);

        default:
            return state;
    }
}
