//const prefix = '';
const prefix = 'http://37.139.19.174';
import request from 'superagent';
import * as Actions from '../actions/Actions';
import superagentPromise from 'superagent-promise-plugin';

export function getItems(search, types, sources) {
    return request.get(prefix + '/api/items').use(superagentPromise).end();
};
