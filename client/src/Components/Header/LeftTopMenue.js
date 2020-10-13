import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import logo from './logoStore.png'
import {faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { Nav, NavItem,  NavLink } from 'reactstrap';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem


} from 'reactstrap'


const Example = (props) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <BrowserRouter>


    <div>
      <Container>
      <Row>
      <Col size="2">
      <img className="logo" src={logo} alt=""/>
      </Col>
      <Col size="8">
      <Navbar color="red" light>
      <Nav className="text-right" >
      <NavItem className="d-none d-lg-block">
      <NavLink className="StoreLink mt-4" href="/components/">| SHOP </NavLink></NavItem>
      <NavItem className="d-none d-lg-block">
      <NavLink className="StoreLink mt-4" href="/components/">| DEALS</NavLink> </NavItem>
      <NavItem className="d-none d-lg-block">
      <NavLink className="StoreLink mt-4" href="/components/">| WHAT"S NEW</NavLink> </NavItem>
      </Nav>
      
      </Navbar></Col>
      <Col size="2" className="text-left">
      <NavItem className="d-none d-lg-block mt-4 ml-5 pl-5">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="StoreLink" nav caret>
      <FontAwesomeIcon icon={faUserAlt } /> Sign In / Account
      </DropdownToggle>
      <DropdownMenu color="dark">
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Action</DropdownItem>
      <DropdownItem>Action</DropdownItem>
      </DropdownMenu>
      </Dropdown>
      </NavItem>
      </Col>

      </Row>
      </Container>
    </div>
    </BrowserRouter>


  );
}


export default Example;
