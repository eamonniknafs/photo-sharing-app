import Gal from "../gallery/Gal";

function Explore(props) {
    return (
        <Gal gallery={props.gallery} comments={props.comments} profileData={props.profileData}/>
    );
}

export default Explore;