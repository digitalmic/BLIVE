import {
    LOGIN,
    LOGOUT,
    CHECKING
} from '../actions/type'

const INITISAL_STATE = {
    user: null,
    loading: false,
    isloggedin: false
}

export default (state = INITISAL_STATE, action ) => {
    switch (action.type){
        case CHECKING: {
            return {...state, loading: true};
        }
        case LOGIN: {
            // console.log('User login');
            return {...state, user: action.payload, loading: false, isloggedin: true};
        }
        case LOGOUT: {
            // console.log('User logout');
            return {...state, user: action.payload, loading: false, isloggedin: false};
        }
        default: {
            return state;
        }
    }
}