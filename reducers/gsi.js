import * as actions from '../constants/ActionTypes';
import * as utils from '../utils/Utils';
import * as storage from '../utils/Storage';
import _ from 'lodash';
import defaultState from './initial.json';

let isMobile = utils.checkIfNotDesktop();

if (isMobile) {
    defaultState.is_mobile = true;
    defaultState.side_bar = false;
    defaultState.autoplay = false;
}

let initState = _.merge({}, defaultState, storage.loadState());

export default function gsi(state = initState, action) {
    if (process.env.NODE_ENV !== 'production') {
        console.log('another action with state', action, state);
    }

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

        case actions.TOGGLE_AUTOPLAY:
            return _.merge({}, state, {'autoplay' : !state.autoplay});

        case actions.TOGGLE_SETTINGS_VIEW:
            return _.merge({}, state, {'settings_view' : !state.settings_view});

        case actions.TOGGLE_SUGGEST_VIEW:
            return _.merge({}, state, {'suggest_view' : !state.suggest_view});

        case actions.TOGGLE_SIDE_BAR:
            return _.merge({}, state, {'side_bar' : !state.side_bar});

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
            var index = -1;
            var tempState = _.clone(state);

            delete tempState.queries;

            state.queries.forEach(function(q, i) {
                if (q._hash === action.query._hash) {
                    index = i;
                }
            });

            if (index > -1) {
                if (state.queries.length < 2 || index === state.queries.length) {
                    return state;
                }

                return _.merge({}, tempState, {'queries' : [...state.queries.slice(0, index + 1)]});
            } else {
                return _.merge({}, state, {'queries' : [...state['queries'], ...action.query]});
            }

        case actions.GOT_ITEM:
            var newObj = {'single_view' : action.res.body};
            return _.merge({}, state, newObj);

        case actions.SEEN_ITEMS:
            var newObj = {'seen' : {}};
            newObj.seen[action.res.body.query._hash] = utils.generateSeen(state.seen[action.res.body.query._hash], action.res.body.items);

            return _.merge({}, state, newObj);

        case actions.UNVIEW_ITEM:
            var newObj = {'single_view' : null};
            return _.merge({}, state, newObj);

        case actions.GOT_ITEMS:
            var newObj = {'lists' : {}, 'search' : {'isLoading' : false}};
            newObj['lists'][action.res.body.query._hash] = {};
            newObj['lists'][action.res.body.query._hash]['query'] = action.res.body.query;
            newObj['lists'][action.res.body.query._hash]['items'] = [
                ...state.lists[action.res.body.query._hash] ? state.lists[action.res.body.query._hash]['items'] : [],
                ...action.res.body.items
            ];

            newObj.lists[action.res.body.query._hash].items = utils.filterDuplicates(newObj.lists[action.res.body.query._hash].items);

            var tempState = _.merge({}, state, newObj);

            //save the state
            storage.saveState(tempState);
            return tempState;

        case actions.GOT_FRAGMENTS:
            let newObj = {
                'fragments' : action.fragments
            }

            return _.merge({}, state, newObj);

        default:
            return state;
    }
}
