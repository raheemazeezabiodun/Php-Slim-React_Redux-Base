import axios from 'axios';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus } from '../utils';
import {
    FECTH_REQUEST,
    FECTH_SUCCESS, 
    FECTH_FAILURE,
} from '../constants/';


export function fetchRequest() {
    return {
        type: FECTH_REQUEST
    };
}

export function fetchSuccess(data) {
    return {
        type: FECTH_SUCCESS,
        payload: {
            data
        }
    };
}

export function fetchFailure(error, message) {
    return {
        type: FECTH_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function readAction(payload) {
    return (dispatch) => {
        dispatch(fetchRequest());
        return axios.get(`${SERVER_URL}/demo/`)
            .then(checkHttpStatus)
            .then((response) => {
                dispatch(fetchSuccess(response.data));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(fetchFailure(500, `A server error occurred while 
                                    receiving your data! with the following message ${error.response}`));
                } else {
                    // Most likely connection issues
                    dispatch(fetchFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}
