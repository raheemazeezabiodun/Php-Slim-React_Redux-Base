import axios from 'axios';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus } from '../utils';
import {
    CREATE_REQUEST,
    CREATE_SUCCESS, 
    CREATE_FAILURE,
} from '../constants/';


export function createRequest() {
    return {
        type: CREATE_REQUEST
    };
}

export function createSuccess() {
    return {
        type: CREATE_SUCCESS
    };
}

export function createFailure(error, message) {
    return {
        type: CREATE_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function createAction(payload) {
    return (dispatch) => {
        dispatch(createRequest());
        return axios.post(`${SERVER_URL}/demo/`, {
                first_name: payload.firstName,
                last_name: payload.lastName,
                age: payload.age,
                others: payload.others
        })
            .then(checkHttpStatus)
            .then((response) => {
                dispatch(createSuccess());
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(createFailure(500, `A server error occurred while sending your data! 
                                            with the response ${error.response}`));
                } else {
                    // Most likely connection issues
                    dispatch(createFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}
