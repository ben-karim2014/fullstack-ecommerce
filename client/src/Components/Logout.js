import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/authActions'
import {NavLink} from 'reactstrap'
import {PropTypes} from 'prop-types'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export class Logout extends Component{

   
    constructor() {
        super()
        this.click = this.click.bind(this)
      }
      
    static propTypes =  {
        logout: PropTypes.func.isRequired,
       
    }
    
    click(e){
        e.preventDefault();
        cookies.set('token', {session: false},{expires: Date.now()});
          this.props.logout();
        
      }
    
    render(){
       
        return(
            <Fragment>
            <NavLink onClick={this.props.logout}
                href='#'>
            logout
            </NavLink>
            </Fragment>

        )
    }

}

export default connect(
    null,
    {logout}
)(Logout);