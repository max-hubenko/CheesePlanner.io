import React from "react";
 // We import NavLink to utilize the react router.
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

 // Here, we display our Navbar
export default function Navibar() {
 return (
  <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">CheesePlanner.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Add Schedule</Nav.Link>
            <NavDropdown title="View Schedule" id="basic-nav-dropdown">
              <NavDropdown.Item href="/daily">Daily</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Weekly
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Monthly</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 );
}