import {
    TOGGLE_SEARCH_TYPE
} from '../constants/ActionTypes';

export function toggleSearchType(list, item) {
    return {
        type: TOGGLE_SEARCH_TYPE,
        list: list,
        item: item
    };
}

export function getItems(list, item) {
    return {
        type: TOGGLE_SEARCH_TYPE,
        list: list,
        item: item
    };
}
