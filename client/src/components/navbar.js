import React from "react";
 // We import NavLink to utilize the react router.
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

 // Here, we display our Navbar
export default function Navibar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          width="35vh"
          style={{ marginRight: "5px", marginLeft:"5px" }}
          src="https://github.com/max-hubenko/M-Ms-cheese-hacks/blob/main/cartoon-cheese-1.png?raw=true"
          alt="Cheese png"
        />
        <Navbar.Brand href="/">CheesePlanner.io</Navbar.Brand>
      </div>
      <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Add Schedule</Nav.Link>
            <NavDropdown  style={{marginRight:"5px"}} title="View Schedule" id="basic-nav-dropdown">
              <NavDropdown.Item href="/daily">Daily</NavDropdown.Item>
              <NavDropdown.Item href="/weekly">Weekly</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Monthly</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  
   );
}