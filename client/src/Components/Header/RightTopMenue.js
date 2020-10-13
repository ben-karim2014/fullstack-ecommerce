import React from 'react';
import { faUserAlt, faShoppingCart,faMapMarkerAlt, faSignInAlt, faIdCardAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logout from '../Logout'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
 NavItem,
 NavLink,
  UncontrolledDropdown,
 DropdownToggle,
 DropdownMenu,
  DropdownItem, 
  Container
  
} from 'reactstrap';
import { Fragment } from "react";

class TopMenue extends React.Component {
  
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
render(){
  const {isAuthenticated, user} = this.props.auth

  const AuthNav = (
    <Fragment>
    <NavItem>
    <span>
    { user ? `Welcome ${user.firstName}` : '' }
    </span>
    </NavItem>
    <NavItem><Logout /> </NavItem>
    </Fragment>
  )
  const GuestNav = (
    <Fragment>
    <NavItem className="d-block d-sm-none d-md-block"><NavLink href="/Account/"><FontAwesomeIcon icon={faUserAlt} /> My Account</NavLink> </NavItem>
    <NavItem className="d-block d-sm-none d-md-block"><NavLink href="/login/"><FontAwesomeIcon icon={faSignInAlt} /> Signin</NavLink> </NavItem>
    </Fragment>
  )
  return (
    <div >
    
    <Navbar color="light" light expand="lg" className="container-fluid">
    <Container className="container hidden-xs">
    <NavLink > <FontAwesomeIcon icon={faPhone} rotation={90}/> OUR PHONE NUMBER: +1 (310) 947- 0648</NavLink>
    </Container>

    <Nav className="container hidden-xs"  navbar>

    {isAuthenticated ? AuthNav : GuestNav}

    <NavItem className="d-none d-lg-block"><NavLink href="/components/"><FontAwesomeIcon icon={faShoppingCart} /> Cart</NavLink> </NavItem>
    <NavItem className="d-none d-lg-block"><NavLink href="/components/"><FontAwesomeIcon icon={faMapMarkerAlt} /> Our location</NavLink></NavItem>
    <NavItem className="d-none d-lg-block"><NavLink href="/components/"><FontAwesomeIcon icon={faIdCardAlt} /> Contact us</NavLink> </NavItem>
    </Nav>
    </Navbar>
    
          </div>


        
     
    
  );

}
  
}

const mapStateToProps = state => ({
  auth: state.auth

})

export default connect(mapStateToProps, null)(TopMenue);