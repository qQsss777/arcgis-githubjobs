import { AppReducer } from "../interfaces";
import * as ACTION_TYPES from '../actions';

export const reducer = (state: AppReducer, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_DATA:
            return { ...state, data: action.payload.data };
        case ACTION_TYPES.SET_VALUE:
            return { ...state, value: action.payload.value };
        default:
            throw new Error();
    }
}