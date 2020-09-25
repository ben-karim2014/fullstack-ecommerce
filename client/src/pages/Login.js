import React, {Component} from 'react';
import { faUserAlt, faLock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TopHeader from '../Components/Header/TopHedaer'
import {register} from '../actions/authActions'
import {clearErrors} from '../actions/errorActions'
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



} from 'reactstrap'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Login extends Component{
    state= {
       
        email: '',
        password: '',
        msg:null
        
    }
    static propTypes = {
        isAthenticated : PropTypes.bool,
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
            <div>
            <TopHeader />
            
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
            <Form  onSubmit={this.onSubmit}>
            
            <Container fluid className="full-height bg-light">
            <Row className="h-100 justify-content-center full-height align-items-center bg-light">
              <Col xs="10" lg="3" className="p-0">
                <Card>
                  <CardBody>
                    <CardTitle>LOGIN</CardTitle>
                    <CardText>Sign in with your account.</CardText>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                        <FontAwesomeIcon icon={faUserAlt} />
                        </span>
                      </div>
                      <Input type="text" placeholder="Email"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <Input type="password" placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="12" lg="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="12" lg="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              
            
            </Row>
             
           <Row className="h-100 justify-content-center full-height align-items-center bg-light">
           <Col xs="8" lg="3" className="p-0">
           <Card color="dark">
             <CardBody className="text-white">
               <CardTitle>CREATE ACCOUNT</CardTitle>
               <CardText>Don't have an account. Please create an account </CardText>
            
               <Col xs="12" lg="6" className="text-right">
                   <Button color="link" className="px-0" href="/register"> >>Join</Button>
                 </Col>
               
             </CardBody>
           </Card>
          
           </Col>
           </Row>
          </Container>
            </Form>
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
    {register, clearErrors}
)(Login);
