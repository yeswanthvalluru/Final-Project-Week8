import {
    GET_SERVERS_SUCCESS,
    GET_MESSAGES_SUCCESS,

    LOADING
} from '../actions/types';

const initialState = {
    servers: [],
    messages: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_SERVERS_SUCCESS:
            return {
                ...state,
                servers: [...action.payload],
                loading: false
            };
        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: [...action.payload],
                loading: false
            }
        default:
            return state;
    }
}