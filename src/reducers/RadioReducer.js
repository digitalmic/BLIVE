import {
    RADIO_PLAY,
    RADIO_STOP,
    RADIO_LOADING
} from '../actions/type'

const INITISAL_STATE = {
    isLoading: false,
    isPlay: false
}

export default (state = INITISAL_STATE, action ) => {
    switch (action.type){
        case RADIO_LOADING: {
            return {...state, isLoading: true};
        }
        case RADIO_PLAY: {
            return {...state, isPlay: true, isLoading: false};
        }
        case RADIO_STOP: {
            return {...state, isPlay: false, isLoading: false};
        }
        default: {
            return state;
        }
    }
}