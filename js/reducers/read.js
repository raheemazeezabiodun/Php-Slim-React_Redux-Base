import { createReducer } from '../utils';
import {
    FETCH_REQUEST, 
    FETCH_SUCCESS, 
    FETCH_FAILURE
} from '../constants';

const initialState = {
    isFetching: false,
    statusText: null,
    data: null
};

export default createReducer(initialState, {
    [FETCH_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: null
        });
    },
    [FETCH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            statusText: 'Read successfully.'
        });
    },
    [FETCH_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    }
});