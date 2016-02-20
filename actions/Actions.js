import * as types from '../constants/ActionTypes';

export function toggleSearchType(list) {
    return {
        type: types.TOGGLE_SEARCH_TYPE,
        list: list
    };
}
