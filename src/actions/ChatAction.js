import {
    INPUT_MESSAGE_CHANGE,
    RETRIEVE_MESSAGE,
    RETRIEVE_MESSAGE_SUCCESS,
    RETRIEVE_MESSAGE_FAIL,
    SEND_MESSAGE,
    SEND_MESSAGE_KONTEN,
    // SEND_MESSAGE_SUCCESS,
    // SEND_MESSAGE_FAIL,
    GET_USER
} from './type';
import firebase from 'firebase';

import { filterText } from '../components/FilterText';

export const inputMessageChange = (text) => {
    return {
        type: INPUT_MESSAGE_CHANGE,
        payload: text
    };
};

export const getUser = () => {
    return {
        type: GET_USER,
        payload: null
    }
}

export const sendMessage = (message) => {

    let filteredMessage = filterText(message.text);

    const sendMessage = {
        text: filteredMessage,
        user: message.user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    let messagesRef = firebase.database().ref('messages');
    messagesRef.push(sendMessage);

    return {
        type: SEND_MESSAGE,
        payload: null
    }
}

export const sendMessageKonten = (idKonten, message) => {

    let filteredMessage = filterText(message.text);

    const sendMessage = {
        text: filteredMessage,
        user: message.user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    }

    let messagesRef = firebase.database().ref(`messagesKonten${idKonten}`);
    messagesRef.push(sendMessage);
    messagesRef.off();

    return {
        type: SEND_MESSAGE_KONTEN,
        payload: null
    }
}

export const retrieveMessage = () => {

    return (dispatch) => {

        dispatch({
            type: RETRIEVE_MESSAGE
        })

        let messagesRef = firebase.database().ref('messages');
        messagesRef.limitToLast(10)
            .on('child_added', snapshot => {
                const { createdAt: numberStamp, text, user } = snapshot.val();
                const { key: _id } = snapshot;
                const createdAt = new Date(numberStamp);
                const message = {
                    _id,
                    createdAt,
                    text,
                    user,
                };
                retrieveMessageSuccess(dispatch, message)
            });
    }
}

const retrieveMessageSuccess = (dispatch, message) => {
    dispatch({
        type: RETRIEVE_MESSAGE_SUCCESS,
        payload: message
    })
}

const retrieveMessageFail = (dispatch) => {
    dispatch({
        type: RETRIEVE_MESSAGE_FAIL,
        payload: null
    })
}