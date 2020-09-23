import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    isloading: false,
    user:null
}

//salva
export default function(state=initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isloading:true
            };
        case USER_LOADED:
            return{
                ...state,
                isAthenticated: true,
                isloading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAthenticated: true,
                isloading: false,
                user: action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL: 
            return{
                ...state,
                user: null,
                isAthenticated: false,
                isloading: false
            }
        default:
            return state

    }

}