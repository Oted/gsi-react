import * as actions from '../constants/ActionTypes';
import * as api from '../utils/Api';
import * as utils from '../utils/Utils';

export function toggleSearchType(list, item) {
    return {
        type: actions.TOGGLE_SEARCH_TYPE,
        list: list,
        item: item
    };
}

export function setActiveQuery(query) {
    return {
        type: actions.SET_ACTIVE_QUERY,
        query: query
    };
}

export function setSearchText(text) {
    return {
        type: actions.SET_SEARCH_TEXT,
        text: text
    };
}

export function gotItems(err, res) {
    return {
        type: actions.GOT_ITEMS,
        res,
        err
    };
}

export function search() {
    return (dispatch, getState) => {
        const { search } = getState().gsi;

        return api.getItems(search.for, utils.getActiveTypes(search.in), utils.getActiveTypes(search.from))
        .then(function(res) {
            if (getState().gsi.queries.length < 1) {
                //dispatch(setActiveQuery(res.body.query));
                dispatch(setActiveQuery({'title' : 'test','count' : 1000, '_id' : 'an_id'}));
            }

            const obj = {
                'items' : res.body,
                'query' : {
                    'title' : 'test',
                    'count' : 1000,
                    '_id' : 'an_id'
                }
            };

            return dispatch(gotItems(null, {'body' : obj}));
        });
    }
}
