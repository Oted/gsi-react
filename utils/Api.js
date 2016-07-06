var prefix = 'http://localhost:3000';

if (process.env.NODE_ENV === "production") {
    prefix = '';
}

import request from 'superagent';
import * as Actions from '../actions/Actions';
import superagentPromise from 'superagent-promise-plugin';

export function getItem(hash) {
    return request
        .get(prefix + '/api/item?hash=' + hash)
        .use(superagentPromise);
}

export function getItems(search, types, seen = {}) {
    let typeString = types.map(type => {
        return '&types=' + type;
    }).join('');

    let seenString = '';

    if (seen.first) {
        seenString += '&first=' + seen.first;
    }

    if (seen.last) {
        seenString += '&last=' + seen.last;
    }

    if (!search) {
        return request
            .get(prefix + '/api/items?' + typeString.slice(1) + seenString)
            .use(superagentPromise);
    }

    return request
        .get(prefix + '/api/items?search=' + search + typeString + seenString)
        .use(superagentPromise);
}

export function getItemsWithQuery(hash, seen = {}) {
    let seenString = '';

    if (seen.first) {
        seenString += '&first=' + seen.first;
    }

    if (seen.last) {
        seenString += '&last=' + seen.last;
    }

    return request
        .get(prefix + '/api/items?query=' + hash + seenString)
        .use(superagentPromise);
}

export function fetchItems(hash, seen = {}) {
    let seenString = '';

    if (seen.first) {
        seenString += '&first=' + seen.first;
    }

    if (seen.last) {
        seenString += '&last=' + seen.last;
    }

    return request.get(prefix + '/api/items?query=' + hash + seenString).use(superagentPromise);
};

export function getFragments(type) {
    let amount = 17;

    return Promise.all([
        request.get(prefix + '/api/fragments?type=trending&amount=' + amount).use(superagentPromise),
        request.get(prefix + '/api/fragments?type=fresh&amount=' + amount).use(superagentPromise),
        request.get(prefix + '/api/fragments?type=highlighted&amount=' + 10).use(superagentPromise)
    ]);
};

export function getRelatedFragments(fragment) {
    return request
        .get(prefix + '/api/relatedfragments?fragment=' + fragment)
        .use(superagentPromise);
};
