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
            return dispatch(gotItems(null, res));
        }).catch(function(err) {
            return dispatch(gotItems(err));
        });
    }
}
