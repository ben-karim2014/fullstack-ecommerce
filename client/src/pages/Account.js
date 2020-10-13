import React, {Component} from 'react'
import Register from '../Components/Login/Register'
import {login} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'
import {register} from '../actions/authActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TopHeader from '../Components/Header/TopHedaer'
import NotLogged from './NotLoggedPage'




export class Account extends Component{ 

    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired

    }
 
    render(){
        const {isAuthenticated, user} = this.props.auth
        return (
            <div className="App" >
            { isAuthenticated ? <h1>This your account</h1> : <NotLogged/>}
             </div>
        )
    }


}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAthenticated,
    error: state.error,
    auth: state.auth

})
export default connect (
    mapStateToProps,
    {login, register, clearErrors}
)(Account);