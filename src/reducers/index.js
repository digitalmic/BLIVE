import {combineReducers} from 'redux';

import KontenReducer from './KontenReducer';
import KontenAcara from './KontenAcaraReducer';
import AuthReducer from './AuthReducer';
import ChatReducer from './ChatReducer';
import RadioReducer from './RadioReducer';
import VisualRadioReducer from './VisualRadioReducer';
import AdsReducer from './AdsReducer';

export default combineReducers({
    konten: KontenReducer,
    acara: KontenAcara,
    auth: AuthReducer,
    chat: ChatReducer,
    radio: RadioReducer,
    visual: VisualRadioReducer,
    ads: AdsReducer
})