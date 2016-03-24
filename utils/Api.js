const prefix = '';
//const prefix = 'http://localhost';

import request from 'superagent';
import * as Actions from '../actions/Actions';
import superagentPromise from 'superagent-promise-plugin';

export function getItems(search, types) {
    let typeString = types.map(type => {
        return '&types=' + type;
    }).join('');

    if (!search) {
        return request
            .get(prefix + '/api/items?' + typeString.slice(1))
            .use(superagentPromise)
            .end();
    }

    return request
        .get(prefix + '/api/items?search=' + search + typeString)
        .use(superagentPromise)
        .end();
}

export function fetchItems(search, types, list) {
    let typeString = types.map(type => {
        return '&types=' + type;
    }).join('');


    let first = list[0]._sort;
    let last = list[list.length - 1]._sort;
    let firstLastString = '';

    if (first && last && (first !== last)) {
        firstLastString = '&last=' + last;
    }

    return request.get(prefix + '/api/items?search=' + search + typeString + firstLastString).use(superagentPromise).end();
};

export function getFragments(type) {
    let amount = 10;

    return Promise.all([
        request.get(prefix + '/api/fragments?type=trending&amount=' + amount).use(superagentPromise).end(),
        request.get(prefix + '/api/fragments?type=fresh&amount=' + amount).use(superagentPromise).end(),
        request.get(prefix + '/api/fragments?type=popular&amount=' + amount).use(superagentPromise).end()
    ]);
};
