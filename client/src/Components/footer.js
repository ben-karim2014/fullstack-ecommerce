import React, {Fragment, Component } from 'react'
import Container from 'reactstrap/lib/Container'

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
    Row,
    Col
    
  } from 'reactstrap';

export default class Footer extends Component {
    render() {
        return  (
            <Fragment>
                <Container   className="footer" fluid>
                <hr></hr>
                
                <div>this is footer</div>
                
                </Container>
            </Fragment>
        )
    }
}
