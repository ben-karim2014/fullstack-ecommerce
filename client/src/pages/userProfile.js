import React, {Component} from 'react';
import { faEnvelope, faLock, faEyeSlash, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TopHeader from '../Components/Header/TopHedaer'
import { Link } from 'react-router-dom'
import {login} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'
import TopMenue from '../Components/Header/TopMenue'
import Footer from '../Components/footer'
import Account from './Account'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Alert,
    Container,
    Card,
    CardBody,
    CardTitle,
    CardText,
    InputGroup,
    CardLink,
    NavLink
    
    



} from 'reactstrap'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Profile extends Component{
    state= {
       
        email: '',
        password: '',
        msg:null,
        hidden1: true
        
    }
    static propTypes = {
        isAthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }


    componentDidUpdate(prevProps){
        const {error} = this.props;
        
        if(error !== prevProps.error){
            if(error.id=== 'LOGIN_FAIL'){
                this.setState({msg: error.msg})

            }
            else {
                this.setState({ msg: null})
            }
        }

    }
    toggleShow= () => {
        this.setState({
          hidden1: !this.state.hidden1
        });
    }
    
      
    onSubmit = e =>{
        this.props.clearErrors();
        e.preventDefault();
        //e.target.className += " was-validated";

        const {email, password} = this.state;
        //Create User Object
        const newUser =
        {
           
            email,
            password,
          
        }
        //Attempt to login
        this.props.login(newUser);
       // console.log(`The message is : ${this.state.msg}`);

    }
    changeValue = (e) => {
        this.props.clearErrors();
        this.setState({
         [e.target.name] : e.target.value   })
    }
    
    render(){
        //{if(!this.props.isAthenticated){this.props.history.push('/Account')}}
        return (
            <div>
               
            <TopHeader />
            <Container>

            </Container>
           <hr></hr>
           <Footer />
            </div>
          );
    }

}
const mapStateToProps = state =>({
    isAthenticated : state.auth.isAthenticated,
    error: state.error
})
export default connect (
    mapStateToProps,
    {login, clearErrors}
)(Profile);




