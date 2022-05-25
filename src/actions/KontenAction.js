import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    SELECT_KONTEN,
    SELECT_DOKUMENTASI,
    SELECT_INTERAKTIF,

    RETRIEVE_HIGHLIGHT,
    RETRIEVE_HIGHLIGHT_SUCCESS,
    RETRIEVE_HIGHLIGHT_FAIL,

    RETRIEVE_INTERAKTIF,
    RETRIEVE_INTERAKTIF_SUCCESS,
    RETRIEVE_INTERAKTIF_FAIL,
    
    RETRIEVE_KONTEN,
    RETRIEVE_KONTEN_SUCCESS,
    RETRIEVE_KONTEN_FAIL,
    
    RETRIEVE_ON_AIR,
    RETRIEVE_ON_AIR_SUCCESS,
    RETRIEVE_ON_AIR_FAIL,
    
    RETRIEVE_DOKUMENTASI,
    RETRIEVE_DOKUMENTASI_SUCCESS,
    RETRIEVE_DOKUMENTASI_FAIL,
    
    RETRIEVE_LIVE_EVENT,
    RETRIEVE_LIVE_EVENT_SUCCESS,
    RETRIEVE_LIVE_EVENT_FAIL,

    RETRIEVE_LIVE_STREAMING,
    RETRIEVE_LIVE_STREAMING_SUCCESS,
    RETRIEVE_LIVE_STREAMING_FAIL,
    
    REGISTER_DATA,
    REGISTER_DATA_SUCCESS,
    REGISTER_DATA_FAIL
} from './type';

export const selectKonten = (konten) => {

    Actions.kontendetail();

    return {
        type: SELECT_KONTEN,
        payload: konten
    }
}

export const selectKontenLandscape = (konten) => {

    Actions.kontendetaillandscape();

    return {
        type: SELECT_KONTEN,
        payload: konten
    }
}

export const selectDokumentasi = (konten) => {

    Actions.dokumentasidetail();

    return {
        type: SELECT_DOKUMENTASI,
        payload: konten
    }
}

export const selectDokumentasiLandscape = (konten) => {

    Actions.dokumentasidetaillandscape();

    return {
        type: SELECT_DOKUMENTASI,
        payload: konten
    }
}

export const selectInteraktif = (konten) => {

    Actions.interaktifdetail();

    return {
        type: SELECT_INTERAKTIF,
        payload: konten
    }
}

export const selectInteraktifLandscape = (konten) => {

    Actions.interaktifdetaillandscape();

    return {
        type: SELECT_INTERAKTIF,
        payload: konten
    }
}

export const kirimRegisterData = (id_live, uid, nama, alamat, kota, usia, hp) => {
    return (dispatch) => {

        dispatch({
            type: REGISTER_DATA
        })

        let formData = new FormData();
        formData.append('id_live', id_live);
        formData.append('uid', uid);
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('kota', kota);
        formData.append('usia', usia);
        formData.append('hp', hp);

        axios({
            method: 'post',
            url: 'https://blive.billionaires.id/restapi/live/register',
            data: formData,
            config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        })
            .then(function (response) {
                // console.log(response.data);
                dispatch({
                    type: REGISTER_DATA_SUCCESS
                });

                Actions.pop();
                Alert.alert(
                    'Info',
                    `Registrasi Kamu ${response.data.result}`,
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed')
                        },
                    ],
                    { cancelable: false }
                );
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: REGISTER_DATA_FAIL,
                    payload: error
                });
            });
    };
};

export const retrieveHighlight = () => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_HIGHLIGHT
        })

        axios.get('https://blive.billionaires.id/restapi/highlight')
            .then(response => {
                dispatch({
                    type: RETRIEVE_HIGHLIGHT_SUCCESS,
                    payload: response.data.highlight
                });
            })
            .catch(error => {
                dispatch({
                    type: RETRIEVE_HIGHLIGHT_FAIL,
                    payload: error
                });
            })
    }
}

export const retrieveInteraktif = () => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_INTERAKTIF
        })

        axios.get('https://blive.billionaires.id/restapi/interaktif')
            .then(response => {
                dispatch({
                    type: RETRIEVE_INTERAKTIF_SUCCESS,
                    payload: response.data.interaktif
                });
            })
            .catch(error => {
                dispatch({
                    type: RETRIEVE_INTERAKTIF_FAIL,
                    payload: error
                });
            })
    }
}

export const retrieveOnAir = () => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_ON_AIR
        })

        axios.get('https://blive.billionaires.id/restapi/live/onair')
            .then(response => {
                dispatch({
                    type: RETRIEVE_ON_AIR_SUCCESS,
                    payload: response.data.live
                });
            })
            .catch(error => {
                dispatch({
                    type: RETRIEVE_ON_AIR_FAIL,
                    payload: error
                });
            })
    }
}

export const retrieveLiveEvent = () => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_LIVE_EVENT
        })

        axios.get('https://blive.billionaires.id/restapi/live/active')
            .then(response => {
                dispatch({
                    type: RETRIEVE_LIVE_EVENT_SUCCESS,
                    payload: response.data.live
                });
            })
            .catch(error => {
                dispatch({
                    type: RETRIEVE_LIVE_EVENT_FAIL,
                    payload: error
                });
            })
    }
}

export const retrieveLiveStreaming = () => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_LIVE_STREAMING
        })

        axios.get('https://blive.billionaires.id/restapi/live/linkstreaming')
            .then(response => {
                dispatch({
                    type: RETRIEVE_LIVE_STREAMING_SUCCESS,
                    payload: response.data.live
                });
            })
            .catch(error => {
                dispatch({
                    type: RETRIEVE_LIVE_STREAMING_FAIL,
                    payload: error
                });
            })
    }
}

export const retrieveDokumentasi = () => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_DOKUMENTASI
        })

        axios.get('https://blive.billionaires.id/restapi/dokumentasi')
            .then(response => {
                dispatch({
                    type: RETRIEVE_DOKUMENTASI_SUCCESS,
                    payload: response.data.dokumentasi
                });
            })
            .catch(error => {
                dispatch({
                    type: RETRIEVE_DOKUMENTASI_FAIL,
                    payload: error
                });
            })
    }
}

export const retrieveKonten = () => {

    return (dispatch) => {

        dispatch({
            type: RETRIEVE_KONTEN
        })

        axios.get('https://blive.billionaires.id/restapi/konten')
            .then(response => _retrieveSuccess(dispatch, response.data.konten))
            .catch(error => _retrieveFail(dispatch, error));
    }

}

const _retrieveFail = (dispatch, error) => {

    dispatch({
        type: RETRIEVE_KONTEN_FAIL,
        payload: error
    });
}

const _retrieveSuccess = (dispatch, data) => {

    dispatch({
        type: RETRIEVE_KONTEN_SUCCESS,
        payload: data
    });
}