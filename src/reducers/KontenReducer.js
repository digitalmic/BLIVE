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
} from '../actions/type'

const INITIAL_STATE = {
    loading: false,
    error: '',
    data: [],
    item: {},

    loadingDokumentasi: false,
    errorDokumentasi: '',
    dataDokumentasi: [],
    dokumentasiItem: {},

    loadingInteraktif: false,
    errorInteraktif: '',
    dataInteraktif: [],
    interaktifItem: {},

    loadingOnAir: false,
    errorOnAir: '',
    dataOnAir: [],

    loadingHighlight: false,
    errorHighlight: '',
    dataHighlight: [],

    loadingLive: false,
    errorLive: '',
    dataLive: [],

    loadingLiveStreaming: false,
    errorLiveStreaming: '',
    dataLiveStreaming: [],

    loadingRegister: false,
    errorRegister: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_KONTEN: {
            return { ...state, item: action.payload }
        }
        case SELECT_DOKUMENTASI: {
            return { ...state, dokumentasiItem: action.payload }
        }
        case SELECT_INTERAKTIF: {
            return { ...state, interaktifItem: action.payload }
        }

        case RETRIEVE_HIGHLIGHT: {
            return { ...state, loadingHighlight: true, error: '' }
        }
        case RETRIEVE_HIGHLIGHT_SUCCESS: {
            return { ...state, loadingHighlight: false, dataHighlight: action.payload }
        }
        case RETRIEVE_HIGHLIGHT_FAIL: {
            return { ...state, loadingHighlight: false, errorHighlight: action.payload }
        }

        case RETRIEVE_KONTEN: {
            return { ...state, loading: true, error: '' }
        }
        case RETRIEVE_KONTEN_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case RETRIEVE_KONTEN_FAIL: {
            return { ...state, loading: false, error: action.payload }
        }

        case RETRIEVE_ON_AIR: {
            return { ...state, loadingOnAir: true, errorOnAir: '' }
        }
        case RETRIEVE_ON_AIR_SUCCESS: {
            return { ...state, loadingOnAir: false, dataOnAir: action.payload }
        }
        case RETRIEVE_ON_AIR_FAIL: {
            return { ...state, loadingOnAir: false, errorOnAir: action.payload }
        }

        case RETRIEVE_DOKUMENTASI: {
            return { ...state, loadingDokumentasi: true, errorDokumentasi: '' }
        }
        case RETRIEVE_DOKUMENTASI_SUCCESS: {
            return { ...state, loadingDokumentasi: false, dataDokumentasi: action.payload }
        }
        case RETRIEVE_DOKUMENTASI_FAIL: {
            return { ...state, loadingDokumentasi: false, errorDokumentasi: action.payload }
        }

        case RETRIEVE_INTERAKTIF: {
            return { ...state, loadingInteraktif: true, errorInteraktif: '' }
        }
        case RETRIEVE_INTERAKTIF_SUCCESS: {
            return { ...state, loadingInteraktif: false, dataInteraktif: action.payload }
        }
        case RETRIEVE_INTERAKTIF_FAIL: {
            return { ...state, loadingInteraktif: false, errorInteraktif: action.payload }
        }

        case RETRIEVE_LIVE_EVENT: {
            return { ...state, loadingLive: true, errorLive: '' }
        }
        case RETRIEVE_LIVE_EVENT_SUCCESS: {
            return { ...state, loadingLive: false, dataLive: action.payload }
        }
        case RETRIEVE_LIVE_EVENT_FAIL: {
            return { ...state, loadingLive: false, errorLive: action.payload }
        }

        case RETRIEVE_LIVE_STREAMING: {
            return { ...state, loadingLiveStreaming: true, errorLiveStreaming: '' }
        }
        case RETRIEVE_LIVE_STREAMING_SUCCESS: {
            return { ...state, loadingLiveStreaming: false, dataLiveStreaming: action.payload }
        }
        case RETRIEVE_LIVE_STREAMING_FAIL: {
            return { ...state, loadingLiveStreaming: false, errorLiveStreaming: action.payload }
        }

        case REGISTER_DATA: {
            return { ...state, loadingRegister: true, errorRegister: '' }
        }
        case REGISTER_DATA_SUCCESS: {
            return { ...state, loadingRegister: false, errorRegister: '' }
        }
        case REGISTER_DATA_FAIL: {
            return { ...state, loadingRegister: false, errorRegister: action.payload }
        }
        default: {
            return state;
        }
    }
}