import axios from 'axios';
import {
    RETRIEVE_ADS,
    RETRIEVE_ADS_SUCCESS,
    RETRIEVE_ADS_FAIL
} from './type';

export const retrieveDataAds = () => {

    return (dispatch) => {

        dispatch({ 
            type : RETRIEVE_ADS 
        })

        axios.get('https://blive.billionaires.id/restapi/ads')
        .then(response => retrieveSuccessAds(dispatch, response.data.ads))
        .catch(error => retrieveFailAds(dispatch, error));
    }
    
}

const retrieveFailAds = (dispatch, error) => {

    dispatch({
        type: RETRIEVE_ADS_FAIL,
        payload: error
    });
}

const retrieveSuccessAds = (dispatch, data) => {

    dispatch({
        type: RETRIEVE_ADS_SUCCESS,
        payload: data
    });
}