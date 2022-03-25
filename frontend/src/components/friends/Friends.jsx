import { Container, Card } from 'react-bootstrap';
import Gal from '../gallery/Gal';
import { useEffect } from 'react';
import { AddFriends } from '..';
import { useState } from 'react';



function Friends(props) {
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        props.friends.getFriends(props.profileData.token);
        console.log(props.friends.friends)
    }, [refresh]);
    return (
        <div>
            <div className="side">
                <div className="side-content">
                    <AddFriends profileData={props.profileData} friends={props.friends} setRefresh={setRefresh} />
                </div>
                {props.friends.friends.length !== 0 ? <div className="side-gallery">
                    <Gal gallery={props.gallery} comments={props.comments} profileData={props.profileData} username={props.friends.friends} />
                </div> : null}
            </div >
        </div>
    );
}

export default Friends;