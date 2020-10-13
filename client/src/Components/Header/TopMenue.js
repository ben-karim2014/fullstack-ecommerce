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
  Container,
  Row,
  Col
  
} from 'reactstrap';
import { Fragment } from "react";

class TopMenue extends React.Component{

    render(){
        return (
            <div>
            <Container fluid>
            <Row className="TopMenu">
                <Col lg="3" className="text-left">
                
                <NavLink className="mt-2 text-center"> <FontAwesomeIcon icon={faPhone} rotation={90}/> OUR PHONE NUMBER: +1 (310) 947- 0648</NavLink>
               
                </Col>
               
                <Col lg='6'></Col>
                <Col lg="3" className="text-right">
                <Navbar color="red" light expand="md">
                <Nav className="text-right" >
                <NavItem className="d-none d-lg-block">
                <NavLink className="TopLink" href="/components/"><FontAwesomeIcon icon={faMapMarkerAlt} /> Our location</NavLink></NavItem>
                <NavItem className="d-none d-lg-block">
                <NavLink className="TopLink" href="/components/"><FontAwesomeIcon icon={faIdCardAlt} /> Contact us</NavLink> </NavItem>
                </Nav>
                </Navbar>
                </Col>
            </Row>
            
            </Container>
            
            </div>
            
        )

    }
}
export default TopMenue;