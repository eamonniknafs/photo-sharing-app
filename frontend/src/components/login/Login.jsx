import React, { Component } from "react";
import { Container, Card, Form, Button } from 'react-bootstrap';
import { ReactSession } from 'react-client-session';

export default class Login extends Component {
    render() {
        return (
            <Container className="center">
                <Card className="inner">
                    <Card.Title>Log in</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                                Forgot your password? <a href="#">Click here</a>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="remember">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
        );
    }
}