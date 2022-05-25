import {
    RETRIEVE_ADS,
    RETRIEVE_ADS_SUCCESS,
    RETRIEVE_ADS_FAIL
    
} from '../actions/type'

const INITIAL_STATE = {
    loadingads: false,
    errorads: '',
    dataadscarousel: [],
    dataadsdefault: [],
    dataadsfade: [],
    dataadsmini: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case RETRIEVE_ADS: {
            return {...state, loadingads: true, errorads: ''}
        }
        case RETRIEVE_ADS_SUCCESS: {
            let i;
            let temp = [], temp2 = [], temp3 = [], temp4 = [];
            for( i = 0; i < action.payload.length; i++ ){
                if (action.payload[i].TIPE === "Carousel"){
                    temp.push(action.payload[i]);
                } else if (action.payload[i].TIPE === "Default") {
                    temp2.push(action.payload[i]);
                } else if (action.payload[i].TIPE === "Fade") {
                    temp3.push(action.payload[i]);
                } else {
                    temp4.push(action.payload[i]);
                }
            }
            return {
                ...state, 
                loadingads: false, 
                dataadscarousel: temp, 
                dataadsdefault: temp2, 
                dataadsfade: temp3, 
                dataadsmini: temp4
            }
        }
        case RETRIEVE_ADS_FAIL: {
            return {...state, loadingads: false, errorads: action.payload}
        }
        default: {
            return state;
        }
    }
}