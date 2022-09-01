import React, { useState } from 'react';
import {
  Container,
  Nav,
  Navbar
} from 'react-bootstrap';

function MenuBar() {
  const [active, setActive] = useState(window.location.href.split("http://localhost:3000")[1]);
  
  const showActive = () => {
    return(
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className={active === "/" ? "active" : null}>Home</Nav.Link>
              <Nav.Link href="/register" className={active === "/register" ? "active" : null} style={{position: 'absolute', right: '60px'}}>Register</Nav.Link>
              <Nav.Link href="/login" className={active === "/login" ? "active" : null} style={{position: 'absolute', right: '10px'}}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )

  }

  return (
    <div className="menu-bar">
      {showActive()}
    </div>
  );
}

export default MenuBar;