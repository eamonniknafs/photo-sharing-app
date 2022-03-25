import { Container, Card } from 'react-bootstrap';

function ProfileContent(props) {
    return (
        <div>
            {
                (props.numPhotos === 0) ?
                    <Card className="profile-inner">
                        <Card.Body>
                            <Container>
                                <Card.Title><h1>Profile</h1></Card.Title>
                                <h1 className="display-4">{props.profileData.username}</h1>
                                <h2>{props.profileData.firstname} {props.profileData.lastname}</h2>
                                <h2>{props.profileData.dob}</h2>
                                <h2>{props.profileData.email}</h2>
                                <h2>{props.profileData.hometown}</h2>
                                <h2>{props.profileData.gender}</h2>
                                <h5>Member since:</h5>
                                <h6>{props.profileData.since}</h6>
                            </Container>
                        </Card.Body>
                    </Card>
                    :
                    <Card className="inner-side">
                        <Card.Body>
                            <Container>
                                <Card.Title><h1>Profile</h1></Card.Title>
                                <h1 className="display-4">{props.profileData.username}</h1>
                                <h2>{props.profileData.firstname} {props.profileData.lastname}</h2>
                                <h2>{props.profileData.dob}</h2>
                                <h2>{props.profileData.email}</h2>
                                <h2>{props.profileData.hometown}</h2>
                                <h2>{props.profileData.gender}</h2>
                                <h5>Member since:</h5>
                                <h6>{props.profileData.since}</h6>
                            </Container>
                        </Card.Body>
                    </Card>
            }
        </div>
    );
}

export default ProfileContent;