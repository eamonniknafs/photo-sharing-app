import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        remember: true
    })

    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                if (data === "user not found") {
                    setShowA(true)
                } else if (data === "wrong password") {
                    setShowB(true)
                } else {
                    console.log(data.access_token)
                    props.props.fetchProfileData(data.access_token)
                    props.props.setToken(data.access_token)
                    navigate("/profile")
                }
                console.log(data)
            })
        // console.log(sessionStorage.getItem('token'))
        // console.log(JSON.stringify(formData))
    }

    return (
        <Container className="center">
            <Card className="inner">
                <Card.Title>Log in</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            placeholder="Enter email"
                            required="true"
                            onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            required="true"
                            onChange={e => setFormData({ ...formData, password: e.target.value })} />
                        <Form.Text className="text-muted">
                            Forgot your password? <a href="#">Click here</a>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="remember">
                        <Form.Check type="checkbox" value={formData.remember} label="Remember me" onChange={e => setFormData({ ...formData, remember: e.target.value })} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
            <Toast show={showA} bg="warning" onClose={() => setShowA(false)} delay={4000} autohide className="login-warning">
                <Toast.Header>
                    <FontAwesomeIcon icon="fas fa-info-circle" />
                    <strong className="me-auto">No Account Found</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>That email isn't registerd! Please register above.</Toast.Body>
            </Toast>
            <Toast show={showB} bg="danger" onClose={() => setShowB(false)} delay={4000} autohide className="login-warning">
                <Toast.Header>
                    <FontAwesomeIcon icon="fas fa-info-circle" />
                    <strong className="me-auto">Wrong Password</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>Please try again.</Toast.Body>
            </Toast>
        </Container>
    );
}

export default Login;