import React, { Component } from "react";
import { Container, Card, Form, Button } from 'react-bootstrap';

export default class SignUp extends Component {
    render() {
        return (

            <Container className="center">
                <Card className="inner">
                    <Card.Title>Register</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="firstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>

            // <form>
            //     <h3>Register</h3>

            //     <div className="form-group">
            //         <label>First name</label>
            //         <input type="text" className="form-control" placeholder="First name" />
            //     </div>

            //     <div className="form-group">
            //         <label>Last name</label>
            //         <input type="text" className="form-control" placeholder="Last name" />
            //     </div>

            //     <div className="form-group">
            //         <label>Email</label>
            //         <input type="email" className="form-control" placeholder="Enter email" />
            //     </div>

            //     <div className="form-group">
            //         <label>Password</label>
            //         <input type="password" className="form-control" placeholder="Enter password" />
            //     </div>

            //     <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
            //     <p className="forgot-password text-right">
            //         Already registered <a href="#">log in?</a>
            //     </p>
            // </form>
        );
    }
}