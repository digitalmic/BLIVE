// userdata
// messages
// inputchat

import {
    INPUT_MESSAGE_CHANGE,
    RETRIEVE_MESSAGE,
    RETRIEVE_MESSAGE_SUCCESS,
    RETRIEVE_MESSAGE_FAIL,
    SEND_MESSAGE,
    SEND_MESSAGE_KONTEN,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_USER
} from '../actions/type'

const INITISAL_STATE = {
    messages: [],
    text:""
}

export default (state = INITISAL_STATE, action ) => {
    switch (action.type){
        case INPUT_MESSAGE_CHANGE: {
            return {...state, text: action.payload};
        }
        case SEND_MESSAGE: {
            return {...state, text: ""};
        }
        case SEND_MESSAGE_KONTEN: {
            return {...state};
        }
        case RETRIEVE_MESSAGE: {
            return {...state};
        }
        case RETRIEVE_MESSAGE_SUCCESS: {
            return {...state, messages: [...state.messages, action.payload]};
        }
        default: {
            return state;
        }
    }
}