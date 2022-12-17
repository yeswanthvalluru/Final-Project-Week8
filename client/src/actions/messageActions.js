import axios from 'axios';

import {
    GET_MESSAGES_SUCCESS,
    GET_SERVERS_SUCCESS,
    LOADING
} from './types';

export const getServers = () => dispatch => {
    dispatch({
        type: LOADING
    });

    axios.post(
        '/api/servers/get',
        {}
    ).then(data => {
        dispatch({
            type: GET_SERVERS_SUCCESS,
            payload: data.data
        });
    });
}

export const addServer = (serverName) => dispatch => {
    dispatch({
        type: LOADING
    });

    axios.post(
        '/api/servers/add',
        {
            name: serverName
        }
    ).then(data => {
        dispatch({
            type: GET_SERVERS_SUCCESS,
            payload: data.data
        })
    });
}

export const removeServer = (serverId) => dispatch => {
    dispatch({
        type: LOADING
    });

    axios.post(
        '/api/servers/remove',
        {
            id: serverId
        }
    ).then(data => {
        dispatch({
            type: GET_SERVERS_SUCCESS,
            payload: data.data
        })
    })
}

export const getMessages = (serverId) => dispatch => {
    dispatch({
        type: LOADING
    });

    axios.post(
        '/api/messages/get',
        {
            server: serverId
        }
    )
    .then(data => {
        dispatch({
            type: GET_MESSAGES_SUCCESS,
            payload: data.data
        })
    })
}

export const addMessage = (serverId, message) => dispatch => {
    axios.post(
        '/api/messages/add',
        {
            serverId,
            message
        }
    )
    .then(data => {
        dispatch({
            type: GET_MESSAGES_SUCCESS,
            payload: data.data
        })
    })
}