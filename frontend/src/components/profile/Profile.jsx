import React, { Component } from "react";
import { Container, Image, Card, Col, Row } from 'react-bootstrap';

function Profile() {
    return (
        <Container className="center">
            <Card>
                <Card.Body>
                    <Container>

                        <Card.Title><h1>Profile</h1></Card.Title>
                        <Image width="100px" style={{ 'border-style': 'thin', 'border-width': 'thick' }} src="../../defprofile.jpg" roundedCircle />

                        <h1 class="display-4">[USERNAME]</h1>
                        <h3>Name</h3>
                        <h2>[VALUE]</h2>

                        <h3>Birthday</h3>
                        <h2>[VALUE]</h2>

                        <h3>Email</h3>
                        <h2>[VALUE]</h2>

                        <h3>Hometown</h3>
                        <h2>[VALUE]</h2>

                        <h3>Gender</h3>
                        <h2>[VALUE]</h2>


                        <h5>Member since:</h5>
                        <h6>[VALUE]</h6>

                    </Container>
                </Card.Body>

            </Card>
        </Container >
    );
}

export default Profile;