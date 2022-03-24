import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function Navigation(props) {
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
                    {props.props.token != null ?
                        <Nav>
                            <Nav.Link as={NavLink} to="/profile">
                                Profile
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/upload">
                                Upload
                            </Nav.Link>
                        </Nav > :
                        null}
                </Nav>
                {props.props.token != null ?
                    <LoggedIn props={props.props} /> :
                    <LoggedOut />}

            </Container>
        </Navbar >
    );
}

function LoggedIn(props) {
    function logout() {
        props.props.removeToken()
        props.props.removeProfileData()
    }
    return (
        <Navbar.Collapse className="justify-content-end" >
            <Nav className="justify-content-end" >
                <Navbar.Text>
                    Signed in as: <a href="/profile">{props.props.profileData.username}</a>
                </Navbar.Text>
                <Button variant="outline-secondary" style={{marginLeft:'20px'}} onClick={logout}>
                    Logout
                </Button>
            </Nav>
        </Navbar.Collapse >

    );
}

function LoggedOut() {
    return (
        <Navbar.Collapse className="justify-content-end" >
            <Nav className="space-between" >
                <Nav.Link as={NavLink} to="/login">
                    Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                    Register
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>

    );
}


export default Navigation;