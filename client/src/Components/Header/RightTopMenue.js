import React from 'react';
import { faUserAlt, faShoppingCart,faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const Example = (props) => {
  //const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
    <Navbar color="light" light expand="md" className="mb-10">
    <Container className="hidden-xs">
    <NavLink >OUR PHONE NUMBER: +1 (310) 947- 0648</NavLink>
    <Nav className="ml-auto"  navbar>
    <NavItem><NavLink href="/Account/"><FontAwesomeIcon icon={faUserAlt} /> My Account</NavLink> </NavItem>
    <NavItem><NavLink href="/components/"><FontAwesomeIcon icon={faShoppingCart} /> Cart</NavLink> </NavItem>
    <NavItem><NavLink href="/components/"><FontAwesomeIcon icon={faMapMarkerAlt} /> Our location</NavLink></NavItem>
    <NavItem><NavLink href="/components/">Contact us</NavLink> </NavItem>
    </Nav>
    </Container>
    </Navbar>
          </div>

        
     
    
  );
}

export default Example;