import { Container, Card } from 'react-bootstrap';
import Gal from '../gallery/Gal';
import ProfileContent from './ProfileContent';
import './profile.css'
import { useEffect } from 'react';



function Profile(props) {
    useEffect(() => {
        props.profileData.fetchProfileData(props.profileData.token);
    }, []);
    console.log(props.profileData.profileData.numphotos)
    return (
        <div className='profile-container'>
            {(props.profileData.profileData.numphotos !== 0 && props.profileData.profileData.numphotos !== undefined && props.profileData.profileData.numphotos !== null) ?
                <div className="side">
                    <div className="side-content">
                        <ProfileContent profileData={props.profileData.profileData} />
                    </div>
                    <div className="side-gallery">
                        <Gal gallery={props.gallery} comments={props.comments} profileData={props.profileData} username={[props.profileData.profileData.username]} />
                    </div>
                </div >
                :
                <Container className="center">
                    <ProfileContent profileData={props.profileData.profileData} numPhotos={props.gallery.photos.length} />
                </Container >
            }

        </div>
    );
}

export default Profile;