import * as actions from '../constants/ActionTypes';
import * as api from '../utils/Api';
import * as utils from '../utils/Utils';

window.onload = function() {

};

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

export function scrollToPosition(position) {
    return {
        type: actions.SCROLL_TO_POSITION,
        position
    };
}

export function scrollToIndex(index, queryId) {
    return {
        type: actions.SCROLL_TO_INDEX,
        index,
        queryId
    };
}

export function getItems(queryId) {
    return {
        type: actions.GET_ITEMS,
        queryId
    };
}

export function loadingItems(isLoading) {
    return {
        type : actions.LOADING_ITEMS,
        isLoading
    };
}

export function gotFragments(fragments) {
    return {
        type : actions.GOT_FRAGMENTS,
        fragments
    };
}

export function setCurrentIndex(index, queryId) {
    return {
        type: actions.SET_CURRENT_INDEX,
        index,
        queryId
    };
}

export function fetch() {
    return (dispatch, getState) => {
        const { search } = getState().gsi;
        dispatch(loadingItems(true));

        return api.fetchItems(
                search.for,
                utils.getActiveTypes(search.in),
                getState().gsi.lists[getState().gsi.queries[0]._hash].items)
        .then(function(res) {
            return dispatch(gotItems(null, res));
        });
    }
}

export function init() {
    return (dispatch, getState) => {
        dispatch(search());

        return api.getFragments().then(function(allRes) {
            let fragments = {
                'trending' : allRes[0].body,
                'fresh' : allRes[1].body,
                'popular' : allRes[2].body
            };

            return dispatch(gotFragments(fragments));
        });
    }
}

export function search() {
    return (dispatch, getState) => {
        const { search } = getState().gsi;
        dispatch(scrollToPosition(0));
        dispatch(loadingItems(true));

        return api.getItems(
                search.for,
                utils.getActiveTypes(search.in))
        .then(function(res) {
            dispatch(setActiveQuery(res.body.query));
            return dispatch(gotItems(null, res));
        });
    }
}
