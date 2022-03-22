import { Container, Card } from 'react-bootstrap';

function Profile(props) {
    console.log(JSON.stringify(props.token))
    return (
        <Container className="center">
            <Card>
                <Card.Body>
                    <Container>

                        <Card.Title><h1>Profile</h1></Card.Title>
                        {/* <Image width="100px" style={{ 'border-style': 'thin', 'border-width': 'thick' }} src="../../defprofile.jpg" roundedCircle /> */}

                        <h1 className="display-4">{props.profileData.username}</h1>
                        <h3>Name</h3>
                        <h2>{props.profileData.firstname} {props.profileData.lastname}</h2>

                        <h3>Birthday</h3>
                        <h2>{props.profileData.dob}</h2>

                        <h3>Email</h3>
                        <h2>{props.profileData.email}</h2>

                        <h3>Hometown</h3>
                        <h2>{props.profileData.hometown}</h2>

                        <h3>Gender</h3>
                        <h2>{props.profileData.gender}</h2>

                        <h5>Member since:</h5>
                        <h6>{props.profileData.since}</h6>

                    </Container>
                </Card.Body>

            </Card>
        </Container >
    );
}

export default Profile;