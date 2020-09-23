import axios from 'axios'
import {returnErrors} from './errorActions'
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


export const loadUser = () => (dispatch, getState) =>{
    dispatch({type: USER_LOADING});


    axios.get('http://localhost:5000/api/v1/users/user')
    .then(res => dispatch({
        type:USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
    // Register User
}
export const register = ({firstName, lastName, email, password, address})=> dispatch=>{

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }

    }
    const body = JSON.stringify({firstName, lastName, email, password, address})
    axios.post('http://localhost:5000/api/v1/users/register',body, config)
    .then(res=> dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err=> {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            
            type:REGISTER_FAIL
        })
    })
}
