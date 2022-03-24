import { Container, Card } from 'react-bootstrap';
import Gal from '../gallery/Gal';
import ProfileContent from './ProfileContent';
import './profile.css'

function Profile(props) {
    return (
        <div className='profile-container'>
            {(props.gallery.photos.length === 0) ?
                <Container className="center">

                    <ProfileContent profileData={props.profileData} />
                </Container >
                : <Container className="">
                    <ProfileContent profileData={props.profileData} />
                </Container >
            }
            <Gal gallery={props.gallery} username={'test'}/>
        </div>
    );
}

export default Profile;