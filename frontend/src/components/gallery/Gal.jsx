import Gallery from "react-photo-gallery";
import { Container, Spinner, Card, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './gallery.css'
import { useEffect, useState, useCallback } from 'react';

function Gal(props) {
    const [startLoadingAt, setStartLoadingAt] = useState(0)
    const loadCount = 40
    // const [wait, setWait] = useState(true)
    const [showLoader, setShowLoader] = useState(true)


    function loadMore() {
        if (props.props.fetchPhotos(startLoadingAt, loadCount) === false){
            setShowLoader(showLoader => !showLoader)
        }
        console.log('LOADING MORE, starting at: ' + startLoadingAt)
        // setWait(wait => !wait)
    }

    useEffect(() => {
        loadMore();
    }, [startLoadingAt])


    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom) {
            console.log('show: ' + showLoader)
            console.log('loading: ' + props.props.loading)
            // console.log('wait: ' + wait)
            if (!props.props.loading /*&& !wait*/) {
                setStartLoadingAt(startLoadingAt => startLoadingAt + loadCount)
                console.log('CHANGED')
                // setWait(true)
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <Container fluid >
            <Gallery photos={props.props.photos} onClick={openLightbox} />
            {showLoader ? <Spinner animation="grow" /> : null}
            {viewerIsOpen ?
                <div id="lightbox" onClick={closeLightbox} >
                    <Button className="button" variant="secondary" size="lg"><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></Button>
                    <div className="lightbox-content">
                        <img id="lightbox-img" src={props.props.photos[currentImage].src} />
                        <Card className="comments-container">
                            Hello world!
                        </Card>
                    </div>
                    <Button className="button" variant="secondary" size="lg"><FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
                </div>
                : null}
        </Container>
    );
}

export default Gal;