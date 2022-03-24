import Gallery from "react-photo-gallery";
import { Container, Spinner } from 'react-bootstrap';
import './explore.css'
import { useEffect } from 'react';

function Explore( props ) {
    function loadMore() {
        props.props.fetchPhotos()
    }

    useEffect(() => {
        loadMore()
    }, [props.props.loading])

    return (
        <Container fluid className="content">
            <Gallery photos={props.props.photos} />
            <Spinner  animation="grow" />
        </Container>
    );
}

export default Explore;