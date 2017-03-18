import { createReducer } from '../utils';
import {
    CREATE_REQUEST, 
    CREATE_SUCCESS, 
    CREATE_FAILURE
} from '../constants';

const initialState = {
    isFetching: false,
    statusText: null,
    data: null
};

export default createReducer(initialState, {
    [CREATE_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: null
        });
    },
    [CREATE_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            statusText: 'Created successfully.'
        });
    },
    [CREATE_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    }
});