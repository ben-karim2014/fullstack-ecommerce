import axios from 'axios'
import Cookies from 'universal-cookie';


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

axios.defaults.baseURL = "http://localhost:5000"



//loading user Action
export const loadUser = () => (dispatch, getState) =>{
    dispatch({type: USER_LOADING});

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true'
            
        },
        withCredentials: true 

    }
    axios.get('/api/v1/users/user', config)
    .then(res => {if(res) {dispatch({
       
        type:USER_LOADED,
        payload: res.data
    })}})
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
    // Register User
}
//Register user
export const register = ({firstName, lastName, email, password, address})=> dispatch=>{

    const config = {
        headers: {
            'Content-Type': 'application/json'
            
        },
        withCredentials: true 

    }
    const body = JSON.stringify({firstName, lastName, email, password, address})
    axios.post('/api/v1/users/register',body, config)
    .then(res=> {dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
    //window.location.replace = 'http://localhost:3000/';
    //window.location.reload(true);
    })
    .catch(err=> {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            
            type:REGISTER_FAIL
        })
    })
}
//logout user
export const logout = () => dispatch=> {
    const config = {
        headers: {
            'Content-Type': 'application/json'
            
        },
        withCredentials: true 

    }
    axios.delete('/api/v1/users/logout', config)
    .then((res) => dispatch({
        
        type: LOGOUT_SUCCESS,
        //payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
}

//Logi user
export const login = ({email, password})=> dispatch=>{

    const config = {
        headers: {
            'Content-Type': 'application/json'
            
        },
        withCredentials: true 

    }

    
    const body = JSON.stringify({email, password})
    axios.post('/api/v1/users/login',body, config)
    .then(res=> {dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    })
   // window.location.reload(true);

    })
    .catch(err=> {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            
            type:LOGIN_FAIL
        })
    })
}
