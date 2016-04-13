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

export function toggleSideBar() {
    return {
        type: actions.TOGGLE_SIDE_BAR
    };
}

export function toggleSuggestView() {
    return {
        type: actions.TOGGLE_SUGGEST_VIEW
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

export function unviewItem() {
    return {
        type: actions.UNVIEW_ITEM
    }
}

export function gotItem(err, res) {
    return {
        type: actions.GOT_ITEM,
        res,
        err
    }
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

export function seenItems(res) {
    return {
        type: actions.SEEN_ITEMS,
        res
    };
}

export function viewItem(hash, item = null) {
    return (dispatch) => {
        if (item) {
            return dispatch(gotItem(null, item));
        }

        return api.getItem(hash).then(function(res) {
            return dispatch(gotItem(null, res));
        });
    }
}

export function init() {
    return (dispatch, getState) => {

        if (document.getElementById('list_hash')) {
            dispatch(getQueryWithHash(document.getElementById('list_hash').getAttribute('content')));
        } else {
            dispatch(getQueryWithHash(getState().gsi.default_list));
        }

        if (document.getElementById('item_hash')) {
            dispatch(viewItem(document.querySelector('#item_hash').getAttribute('content')));
        }

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

export function fetch() {
    return (dispatch, getState) => {
        const { search, queries } = getState().gsi;

        if (search.isLoading) {
            console.log('Already loading');
            return ;
        }

        dispatch(loadingItems(true));

        return api.fetchItems(
                queries[queries.length - 1]._hash,
                getState().gsi.seen[queries[queries.length - 1]._hash])
        .then(function(res) {
            dispatch(seenItems(res));
            return dispatch(gotItems(null, res));
        });
    }
}

export function getQueryWithHash(hash) {
    return (dispatch, getState) => {
        return api.getItemsWithQuery(
                    hash,
                    getState().gsi.seen[hash]
                ).then(function(res) {
            dispatch(setActiveQuery(res.body.query));
            dispatch(seenItems(res));
            return dispatch(gotItems(null, res));
        });
    }
}

export function search(term) {
    return (dispatch, getState) => {
        const { search } = getState().gsi;
        dispatch(scrollToPosition(0));
        dispatch(unviewItem());
        dispatch(loadingItems(true));

        return api.getItems(
                term ? term : search.for,
                utils.getActiveTypes(search.in))
        .then(function(res) {
            if (getState().gsi.seen[res.body.query._hash]) {
                console.log('this has been seen before', res);
            }

            dispatch(setActiveQuery(res.body.query));
            dispatch(seenItems(res));
            return dispatch(gotItems(null, res));
        });
    }
}
