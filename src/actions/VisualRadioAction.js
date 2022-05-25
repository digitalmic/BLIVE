import axios from 'axios';
import {
    VISUAL_PLAY,
    VISUAL_STOP,
    VISUAL_LANDSCAPE_PLAY,
    VISUAL_LANDSCAPE_STOP,
    VERIFIED,
    VERIFIED_SUCCESS,
    VERIFIED_FAIL
} from './type';

import { activateKeepAwake } from 'expo-keep-awake';

export const playVisualRadio = () => {
    activateKeepAwake();
    return ({
        type: VISUAL_PLAY,
    })
}

export const stopVisualRadio = () => {
    return ({
        type: VISUAL_STOP,
    })
}

export const playVisualLandscape = () => {
    activateKeepAwake();
    return ({
        type: VISUAL_LANDSCAPE_PLAY,
    })
}

export const stopVisualLandscape = () => {
    return ({
        type: VISUAL_LANDSCAPE_STOP,
    })
}

export const verifiedUser = (isLive, idLive, uid) => {
    if (!isLive) {
        console.log('Is Live');
        return ({
            type: VERIFIED_SUCCESS,
        })
    } else {
        console.log(`data ${idLive} ${uid}`)
        return (dispatch) => {

            dispatch({
                type: VERIFIED
            })

            let uidTemp = null ;
            let formData = new FormData();
            formData.append('id_live', idLive);
            formData.append('uid', uid);

            axios({
                method: 'post',
                url: 'https://blive.billionaires.id/restapi/live/cekuser',
                data: formData,
                config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            })
                .then(response => {
                    // console.log(response);
                    uidTemp = response.data.live.length ? response.data.live[0].UID : null ;
                    if (uidTemp == uid) {
                        console.log(`User Verified ${uidTemp} ${uid}`);
                        dispatch({
                            type: VERIFIED_SUCCESS,
                        });
                    } else {
                        console.log('User Not Verified');
                        dispatch({
                            type: VERIFIED_FAIL,
                            payload: 'data not found'
                        });
                    }

                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: VERIFIED_FAIL,
                        payload: error
                    });
                })
        }
    }
}


