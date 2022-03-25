import { Container, Card } from 'react-bootstrap';
import Gal from '../gallery/Gal';
import ProfileContent from './ProfileContent';
import './profile.css'
import { useEffect } from 'react';



function Profile(props) {
    return (
        <div className='profile-container'>
            {(props.profileData.profileData.numphotos === 0) ?
                <Container className="center">
                    <ProfileContent profileData={props.profileData.profileData} numPhotos={props.gallery.photos.length} />
                </Container >
                : <div className="side">
                    <div className="side-profile-content">
                        <ProfileContent profileData={props.profileData.profileData} />
                    </div>
                    <div className="side-gallery">
                        <Gal gallery={props.gallery} comments={props.comments} profileData={props.profileData} username={props.profileData.profileData.username} />
                    </div>
                </div >
            }

        </div>
    );
}

export default Profile;