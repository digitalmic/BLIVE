import {
    RADIO_PLAY,
    RADIO_STOP,
    RADIO_LOADING
} from './type';

import { Audio } from "expo-av";
import { activateKeepAwake } from 'expo-keep-awake';

let playbackInstance = null;

export const playRadio = () => {

    return async (dispatch) => {

        dispatch({
            type: RADIO_LOADING
        })

        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });

        if (playbackInstance != null) {
            await playbackInstance.unloadAsync();
            playbackInstance = null;
        }

        const source = { uri: "http://s9.viastreaming.net:9055/;stream.mp3" };
        const initialStatus = {
            shouldPlay: false,
            isLooping: false,
        };

        try {
            const {
                sound, status
            } = await Audio.Sound.createAsync(
                source,
                initialStatus,
            );
            playbackInstance = sound;
            playbackInstance.playAsync();

            dispatch({
                type: RADIO_PLAY,
            })
            activateKeepAwake();

        } catch (error) {
            
            dispatch({
                type: RADIO_STOP,
            })

        }

    }
}

export const stopRadio = () => {

    if (playbackInstance != null) {
        playbackInstance.pauseAsync();
    }
    
    return ({
        type: RADIO_STOP,
    })
}

