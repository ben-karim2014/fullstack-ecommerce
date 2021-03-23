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

class Login extends Component{
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
        e.target.className += " was-validated";

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
     {if(this.props.isAthenticated){this.props.history.push('/Account')}}
        return (
            <div>
               
            <TopHeader />
            
            {this.state.msg ? (<Alert color="danger"><FontAwesomeIcon icon={faExclamationTriangle} />{this.state.msg}</Alert>) : null}
            
           <Container fluid> 
           <Row className="spacing">
           <Col size="6" lg="2" className="d-none d-lg-block"></Col>
           <Col size="6" lg="4">
           
           <Form  onSubmit={this.onSubmit} className="needs-validation" noValidate>
          
           <CardTitle >LOGIN</CardTitle>
           <hr></hr>
           <CardText >Sign in with your account.</CardText>
           <Row>
           <Col md={12}>
           <InputGroup className="mb-4 ml-1">
             <div className="input-group-prepend">
               <span className="input-group-text">
               <FontAwesomeIcon icon={faEnvelope} />
               </span>
             </div>

             
             <Input type="text" name='email' size="4" xm="2"  id='email' id="materialFormRegisterEmailEx2"  placeholder="Email" onChange={this.changeValue} required/>
             <div className="valid-feedback">The email looks good!</div>
           </InputGroup>
           </Col>
           </Row>
          <Row>
           <Col md={12}>
           <InputGroup className="mb-4 ml-1">
             <div className="input-group-prepend">
               <span className="input-group-text">
               <FontAwesomeIcon icon={faLock} />
               </span>
             </div>
             <Input type="password"  name='password' id='password' className="form-control" placeholder="Password" type={this.state.hidden1 ? 'password' : 'text'} onChange={this.changeValue} required/> 
            
             </InputGroup>
             
           </Col>
           <span className="InputGroupBtn d-none d-md-block mr-auto">
           {/*<button className="btn btn-default reveal" type="button"  onClick={this.toggleShow }><i><FontAwesomeIcon icon={faEyeSlash} /></i></button>*/}
         </span>
           </Row>
           <Row className="mb-2 w-75 p-3">
             <Col>
               <Button color="danger" className="px-4">Login</Button>
             </Col>
             <Col className="text-right">
               <Link  className="link">Forgot password?</Link>
             </Col>
           </Row>
          
           </Form>
           </Col>



           <Col size="6" lg="4"> 
           <Card>
           <CardBody className="LoginCard">
           <CardTitle>No account yet?</CardTitle>
           
           <CardText>We'll email you an EXTRA 25% OFF your next purchase!</CardText>
           <CardText>Create an account with us and you'll be able to:</CardText>
           <ul>
           <li>Check out faster</li>
           <li>Save multiple shipping addresses</li>
           <li>Access your order history</li>
           <li>Track new orders</li>
           <li>Save items to your wish list</li>
           
           </ul>
        
           <Col xs="12" lg="6" className="text-right">
               <Button  outline color="danger" href="/register"> Create an account</Button>
             </Col>
           
         </CardBody>
         </Card>
         </Col>

           </Row>
           
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
)(Login);
