import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation( props ) {
    return (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Photo Sharing App
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">
                        Explore
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/profile">
                        Profile
                    </Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end" >
                    {props.token != null ?
                        <LoggedIn profileData={props.profileData} /> :
                        <LoggedOut />}
                </Navbar.Collapse>

            </Container>
        </Navbar >
    );
}

function LoggedIn(props) {
    return (
        <Navbar.Text>
            Signed in as: <a href="/profile">{props.profileData.username}</a>
        </Navbar.Text>
    );
}

function LoggedOut() {
    return (
        <Nav className="justify-content-end" >
            <Nav.Link as={NavLink} to="/login">
                Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
                Register
            </Nav.Link>
        </Nav>
    );
}


export default Navigation;