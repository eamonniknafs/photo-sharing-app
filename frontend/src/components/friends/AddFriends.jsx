import { Container, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';

function AddFriends(props) {
    useEffect(() => {
        props.friends.getUsers(props.profileData.token)
        props.friends.getFriends(props.profileData.token);
    }, []);
    return (
        <Card className="inner-side">
            <Card.Body>
                <Container>
                    <Card.Title><h1>Add Friends</h1></Card.Title>
                    <Card.Title><h5>Your friends' photos will appear on the right.</h5></Card.Title>
                    {props.friends.users.map(user => {
                        return (
                            <div key={user}>
                                <Card.Title key={user}><h2>{user}</h2></Card.Title>
                                {props.friends.friends.includes(user) ? <Button variant="danger" onClick={() => {
                                    props.friends.addRemoveFriend(props.profileData.token, user)
                                    props.setRefresh(curr => !curr)
                                }
                                }>Remove Friend</Button>:<Button variant="primary" onClick={() => {
                                    props.friends.addRemoveFriend(props.profileData.token, user)
                                    props.setRefresh(curr => !curr)
                                }
                                }>Add Friend</Button>}
                            </div>
                        );
                    })}
                </Container>
            </Card.Body>
        </Card>
    );
}

export default AddFriends;