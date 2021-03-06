import React, {Component, Fragment} from 'react';
import TopHeader from '../Header/TopHedaer'
import {register} from '../../actions/authActions'
import Login from './Login'
import {clearErrors} from '../../actions/errorActions'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Alert,

} from 'reactstrap'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Regitser extends Component{
    state= {
        firstName:'',
        lastName:'',
        email: '',
        password: '',
        address: '',
        msg:null
        
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        const {error} = this.props;
        
        if(error !== prevProps.error){
            if(error.id=== 'REGISTER_FAIL'){
                this.setState({msg: error.msg})

            }
            else {
                this.setState({ msg: null})
            }
        }

    }
    onSubmit = e =>{
        this.props.clearErrors();
        e.preventDefault();
        const {firstName, lastName, email, password, address} = this.state;
        //Create User Object
        const newUser =
        {
            firstName,
            lastName,
            email,
            password,
            address,
        }
        //Attempt to register
        this.props.register(newUser);
        console.log(`The message is : ${this.state.msg}`);

    }
    changeValue = (e) => {
        this.props.clearErrors();
        this.setState({
         [e.target.name] : e.target.value   })
    }
    render(){
        return (
            <div cladssName="Container">
            <TopHeader />
            <Row>
            <Col className="col-md-5 registerLayAout">
            <div style={{marginLeft: "10"}}><h1>Create an account</h1></div>
            
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}

            <Form className="ml-4" onSubmit={this.onSubmit}>
            <Row className="ml-3 mr-3" form>
                <Col md={6}>
                <FormGroup>
                <Label for="firstName">Your first name</Label>
                <Input type="text" name="firstName" id="firstName" onChange={this.changeValue}/>
              </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                <Label for="lastName">Your last name</Label>
                <Input type="text" name="lastName" id="lastName" onChange={this.changeValue}/>
              </FormGroup>
                </Col>
              </Row>
              <Row className="ml-3 mr-3" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter your email" onChange={this.changeValue}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={this.changeValue} />
                  </FormGroup>
                </Col>
              </Row>
             
              <Button className="ml-3 mr-3">Sign in</Button>
            </Form>

            </Col>
            {/* Login part */}
            <Col className="col-md-5"> 
            <div style={{marginLeft: "10"}}><h1>Login to your account</h1></div>
        
            <Login /></Col>
            
            </Row>
            
            </div>
          );
    }

}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})
export default connect (
    mapStateToProps,
    {register, clearErrors}
)(Regitser);
