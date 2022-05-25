import {
    VISUAL_PLAY,
    VISUAL_STOP,
    VISUAL_LANDSCAPE_PLAY,
    VISUAL_LANDSCAPE_STOP,
    VERIFIED,
    VERIFIED_SUCCESS,
    VERIFIED_FAIL
} from '../actions/type'

const INITISAL_STATE = {
    isVisual: false,
    isVisualLandscape: false,

    isVerified: true,
    verifiedLoading: false,
    verifiedError: ''
}

export default (state = INITISAL_STATE, action) => {
    switch (action.type) {
        case VISUAL_PLAY: {
            return { ...state, isVisual: true };
        }
        case VISUAL_STOP: {
            return { ...state, isVisual: false };
        }
        case VISUAL_LANDSCAPE_PLAY: {
            return { ...state, isVisualLandscape: true };
        }
        case VISUAL_LANDSCAPE_STOP: {
            return { ...state, isVisualLandscape: false };
        }
        case VERIFIED: {
            return { ...state, verifiedLoading: true };
        }
        case VERIFIED_SUCCESS: {
            return { ...state, verifiedLoading: false, isVerified: true };
        }
        case VERIFIED_FAIL: {
            return { ...state, verifiedLoading: false, isVerified: false, verifiedError: action.payload };
        }
        default: {
            return state;
        }
    }
}