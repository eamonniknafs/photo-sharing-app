import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Photo Sharing App
                </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/login">
                            Login
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/register">
                            Register
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/profile">
                            Profile
                        </Nav.Link>
                    </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navigation;