import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {
    SELECT_ACARA,
    RESET_ACARA,
    RETRIEVE_ACARA,
    RETRIEVE_ACARA_SUCCESS,
    RETRIEVE_ACARA_FAIL
} from './type';

export const selectAcara = (idAcara, namaAcara) => {

    Actions.acara();

    return {
        type: SELECT_ACARA,
        payload: {idAcara: idAcara, namaAcara: namaAcara}
    }
}

export const selectAcaraLandscape = (idAcara, namaAcara) => {

    Actions.acaralandscape();

    return {
        type: SELECT_ACARA,
        payload: {idAcara: idAcara, namaAcara: namaAcara}
    }
}

export const resetAcara = () => {
    return {
        type: RESET_ACARA,
        payload: null
    }
}

export const retrieveAcara = (idAcara, page) => {

    return (dispatch) => {

        dispatch({ 
            type : RETRIEVE_ACARA 
        })

        axios.get(`https://blive.billionaires.id/restapi/konten/dataKontenLoadMore/${idAcara}/${page}`)
        .then(response => retrieveAcaraSuccess(dispatch, response.data))
        .catch(error => retrieveAcaraFail(dispatch, error));
    }
    
}

const retrieveAcaraFail= (dispatch, error) => {

    dispatch({
        type: RETRIEVE_ACARA_FAIL,
        payload: error
    });
}

const retrieveAcaraSuccess = (dispatch, data) => {

    dispatch({
        type: RETRIEVE_ACARA_SUCCESS,
        payload: data
    });
}