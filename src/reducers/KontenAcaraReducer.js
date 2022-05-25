import {
    SELECT_ACARA,
    RESET_ACARA,
    RETRIEVE_ACARA,
    RETRIEVE_ACARA_SUCCESS,
    RETRIEVE_ACARA_FAIL
} from '../actions/type';

const INITIAL_STATE = {
    loading: false,
    error: '',
    totalpage: 0,
    page: 0,
    data: [],
    idAcara: 0,
    namaAcara:''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case SELECT_ACARA:{
            return {
                ...state, 
                loading: false,
                error: '',
                totalpage: 0,
                page: 0,
                data: [],
                idAcara: action.payload.idAcara, 
                namaAcara: action.payload.namaAcara}
        }
        case RESET_ACARA: {
            return {
                ...state, 
                loading: false,
                error: '',
                totalpage: 0,
                page: 0,
                data: []
            }
        }
        case RETRIEVE_ACARA: {
            return {...state, loading: true, error: ''}
        }
        case RETRIEVE_ACARA_SUCCESS: {
            console.log(action.payload.totalpage);
            return {
                ...state,
                loading: false, 
                error: '', 
                data: [...state.data, ...action.payload.konten ],
                totalpage: action.payload.totalpage, 
                page: action.payload.page}
        }
        case RETRIEVE_ACARA_FAIL: {
            return {...state, loading: false, error: action.payload}
        }
        default: {
            return state;
        }
    }
}