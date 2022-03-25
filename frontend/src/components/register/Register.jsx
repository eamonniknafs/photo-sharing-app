import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from 'react-bootstrap';

function Register( props ) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    })

    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(function (response) { return response.json(); })
            .then(function (data) {
                props.props.fetchProfileData(data.access_token)
                props.props.setToken(data.access_token)
            }).finally(navigate('/'))
        console.log(sessionStorage.getItem('token'))
        // console.log(JSON.stringify(formData))
    }

    return (
        <Container className="center">
            <Card className="inner">
                <Card.Title>Register</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="firstname"
                            value={formData.firstname}
                            placeholder="First name"
                            required="true"
                            onChange={e => setFormData({ ...formData, firstname: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.lastname}
                            placeholder="Last name"
                            required="true"
                            onChange={e => setFormData({ ...formData, lastname: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.username}
                            placeholder="Pick a username"
                            required="true"
                            onChange={e => setFormData({ ...formData, username: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            placeholder="Enter Email"
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
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container >
    );
}

export default Register;