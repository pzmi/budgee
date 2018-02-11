import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap";

const Header = () => (
  <Navbar inverse collapseOnSelect>
    <LinkContainer to="/">

      <Navbar.Header>
        <Navbar.Brand>
          <a>Budgee</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
    </LinkContainer>

    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/about">
          <NavItem eventKey={1}>
            About
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header
