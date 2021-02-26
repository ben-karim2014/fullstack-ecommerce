import React, {Component, Fragment} from 'react';
import TopHeader from '.././Components/Header/TopHedaer'
import {register} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'
import registerPng from "../images/register.png"
import { faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../Components/footer'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Alert,
    Card,
    CardBody,
    CardTitle,
    InputGroup,
    CardText

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
        const {firstName, lastName, email, password} = this.state;
        //Create User Object
        const newUser =
        {
            firstName,
            lastName,
            email,
            password
          
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
            <div className="Container">
            <TopHeader />
            <Row>
            <Col>
            <Card>
            <CardBody className="LoginCard">
            <div className="registerSpacing" > <h4> <FontAwesomeIcon icon={faStar} />Create an account</h4></div>
            
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
            <Row>
            <Col>
          <div className="registerForm">
            <Form className="rform" onSubmit={this.onSubmit} className="needs-validation" noValidate>
            <Row>
                <Col>
                <FormGroup>
                <Label for="firstName" >Your first name</Label>
                <Input type="text" name="firstName" id="firstName" placeholder="Enter your first name" onChange={this.changeValue}/>
              </FormGroup>
                </Col>
                </Row>

                <Row>
                <Col>
                <FormGroup>
                <Label for="lastName" >Your last name</Label>
                <Input type="text" name="lastName" id="lastName" placeholder="Enter your last name" onChange={this.changeValue}/>
              </FormGroup>
                </Col>
                </Row>
              

              <Row>
                <Col >
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email"  placeholder="Enter your email" onChange={this.changeValue}/>
                  </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" className="form-control pwd"  onChange={this.changeValue} password/>
                  </FormGroup>
                </Col>
              </Row>
             
              <Button outline color="danger" size = "lg w-100">Sign in</Button>
            </Form>
            </div>
            </Col>

            <Col className="">
           
      <img className="registerPng" src={registerPng} alt=""/>
            
            </Col>
            </Row>
            </CardBody>
            </Card>
            </Col>
            
            </Row>
            <Footer />
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
